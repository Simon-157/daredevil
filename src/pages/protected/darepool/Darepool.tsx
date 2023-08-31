import { useInfiniteQuery } from "react-query";
import DarepoolStyles from "./Darepool.module.css";
import Button from "../../../components/button/Button";
import { Dare } from "../../../types/FreakPoolType";
import { darepoolController } from "../../../firebase/controllers/DarePool.controller";
import CustomLoader from "../../../components/loader/loader";

const Darepool = () => {
  const {getAllDares} = darepoolController();

  // Fetch dares using useInfiniteQuery for infinite scrolling
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["dares"], getAllDares, {
    getNextPageParam: (lastPage) => {
      const lastDocumentId = lastPage[lastPage.length - 1]?.id;
  
      if (!lastDocumentId) {
        return null; // No more pages to fetch
      }
  
      // Return the parameter for the next page fetch
      return lastDocumentId;
    },
  });
  

  if (status === "loading") {
    return <CustomLoader />;
  }

  if (status === "error") {
    return <p>Error fetching dares</p>;
  }

  return (
    <div className={DarepoolStyles.darepool}>
      <div className={DarepoolStyles.stats}>
        <h2>{data?.pages.flatMap(page => page).length} dares</h2>
        <Button
          type="outlined"
          style={{
            padding: "10px",
            position: "absolute",
            right: "1rem",
            border: "1px solid rgba(234, 0, 255, 0.126)",
            fontSize: "20px",
            backgroundColor: "rgba(234, 233, 255, 0.126)",
          }}
         
        >
          create dare
        </Button>
      </div>
      <div className={DarepoolStyles.dareList}>
        {data?.pages.flatMap(page => page).map((dare:Dare) => (
          <article className={DarepoolStyles.dare} key={dare.id}>
            <h2>{dare.short_name}</h2>
            <small>{dare.description}</small>
          </article>

        ))}
          <Button
          type="outlined"
          style={{
            display:"flex",
            justifyContent:"center",
            padding: "10px",
            border: "1px solid rgba(234, 0, 255, 0.126)",
            fontSize: "20px",
            backgroundColor: "rgba(234, 233, 255, 0.126)",
          }}
           // @ts-ignore
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      </div>
      
    </div>
  );
};

export default Darepool;
