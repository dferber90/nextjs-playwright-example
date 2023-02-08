import { useState } from "react";

export default function Home({ serverData }) {
  const [data, setData] = useState(null);

  const handleGetData = () => {
    fetch("/api/gateway/info/")
      .then((res) => res.json())
      .then(setData);
  };

  return (
    <div>
      <button onClick={handleGetData}>Load data</button>
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch(`https://jsonkeeper.com/b/AFRW`);
//   const serverData = await res.json();

//   return {
//     props: {
//       serverData,
//     },
//   };
// }
