import { useEffect,useState } from "react";
import "./App.css"

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=100")
  const data = await res.json();

  if(data && data.products)
  {
    setProducts(data.products)
  }

};
useEffect(() => {
 fetchProducts()
},[]);

const selectPageHandler = (selectedPage) => {
  if(
    selectedPage>=1 &&
    selectedPage<= products.length/10 &&
    selectedPage !== page
  )
  setPage(selectedPage)
}

  return (
    <div>{
      products.length > 0 && <div className="products">
        {
          products.slice(page*10-10,page*10).map((prod) =>{
            return(
              <span className="products_single" key={prod.id}>
                <img src={prod.thumbnail} alt= {prod.title}/>
              </span>
            )
          })
        }
      </div>
    }
    {
      products.length>0 &&
       <div className="pagination">
       <span
       className={page > 1 ? "":"pagination_disable"}
        onClick={()=>selectPageHandler(page-1)}>Prev</span>
    {
      [...Array(products.length/10)].map((_,i)=>{
        return <span 
        className={page===i+1?"pagination_selected":""}
        onClick={()=>selectPageHandler(i+1)}
        key={i}>
          {i+1}
          </span>;
      })
    }
    
    <span 
    onClick={()=>selectPageHandler(page+1)}
    className={page< products.length /10 ? "":"pagination_disable"}
    
    >Next</span>
       </div>
    }
    
    </div>
  )
}

export default App
