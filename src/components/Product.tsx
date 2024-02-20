import { Link } from "react-router-dom";
import fullStar from "../assets/star.png";
import halfStar from "../assets/rating.png";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../main";
import { Add_to_Cart, Increase_Item } from "../features/cart";
import { useState, useEffect, useRef } from "react";
import { Search } from "@mui/icons-material";
import { useParams } from "react-router-dom";
export const Product = () => {
  const productsData = useSelector(
    (state: IRootState) => state.product.product
  );
  const carts = useSelector((state: IRootState) => state.cart.cart);
  const rateStar = [0, 1, 2, 3, 4];
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  const { webCategory } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [finalTerm, setFinalTerm] = useState("");
  const [products, setProducts] = useState(productsData);

  const SearchHandler = () => {
    finalTerm == "" && searchRef.current?.focus();
    setFinalTerm(searchTerm);
  };
  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const Sorting = (event: any) => {
    switch (event.target.value) {
      case "highest":
        setProducts(products.slice().sort((a, b) => b.price - a.price));
        break;
      case "lowest":
        setProducts(products.slice().sort((a, b) => a.price - b.price));
        break;
      default:
        setProducts(productsData);
    }
  };
  const renderList = products.map((product: any) => {
    const { id, title, price, image, rating } = product;
    console.log("ID:", id, " ", title.includes(searchTerm));
    if (!title.toLowerCase().includes(finalTerm.toLowerCase())) return <></>;
    return (
      <>
        <div key={id}>
          <div className=" w-full overflow-auto border rounded-lg  p-4 md:p-8 lg:p-10 bg-white ">
            <Link to={`/product/item/${id}`}>
              <div className="w-full  aspect-[4/5]   ">
                <img
                  className="h-full m-auto transition-transform duration-300 transform hover:scale-105"
                  src={image}
                  alt={title}
                />
              </div>
            </Link>
            <div className="pt-4">
              <Link to={`/product/item/${id}`}>
                <div className=" flex h-16 items-center justify-center text-center font-extrabold py-auto ">
                  <p className="line-clamp-2 ">{title}</p>
                </div>

                <div className="text-center mb-2 font-extrabold">${price}</div>
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-5 text-zinc-500 ">{rating.rate}</div>

                  {rateStar.map((number) => {
                    let starType = rating.rate - number;
                    return (
                      <>
                        {starType > 0.5 && starType < 1 && (
                          <img src={halfStar} className="h-4 w-4" />
                        )}
                        {starType >= 1 && (
                          <img src={fullStar} className="h-4 w-4" />
                        )}
                      </>
                    );
                  })}
                </div>
              </Link>
              <div className="flex items-center justify-center mt-4">
                <button
                  className="px-4 py-2 border rounded-lg border-zinc-700 text-zinc-700 hover:bg-zinc-700 hover:text-white"
                  onClick={() => {
                    const findCart = carts.filter((item) => item.id == id);
                    console.log(findCart);
                    findCart.length == 0
                      ? dispatch(
                          Add_to_Cart({
                            id: id,
                            count: 1,
                            name: title,
                            price: price,
                          })
                        )
                      : dispatch(Increase_Item({ id: id }));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div
        className={`${
          finalTerm ? "" : "mb-8"
        } flex min-h-10 gap-4 sm:gap-8 flex-wrap justify-end`}
      >
        <div className="grow flex items-center gap-4 ">
          <h2 className="text-3xl font-bold ">
            {webCategory ? webCategory?.toUpperCase() : "ALL PRODUCTS"}
          </h2>
        </div>
        <div className="flex items-center">
          <h2 className="mr-2 ">Sort:</h2>

          <form action="">
            <label htmlFor="sort">
              <select
                name="sort"
                id="sort"
                className="border w-24 sm:w-36 h-10 px-2"
                onChange={Sorting}
              >
                <option value="defualt">default</option>
                <option value="lowest">price- low to high</option>
                <option value="highest">price- high to low</option>
              </select>
            </label>
          </form>
        </div>
        <div className="border h-10 flex px-2 bg-white">
          <input
            ref={searchRef}
            type="text"
            className="focus:outline-none"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <div
            className="my-auto"
            onClick={() => {
              SearchHandler();
            }}
          >
            <Search color="disabled" sx={{ "&:active": { color: "black" } }} />
          </div>
        </div>
      </div>
      <div className="mb-8">
        {finalTerm && (
          <>
            <p>Showing results for '{finalTerm}'</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 ">
        {renderList}
      </div>
    </>
  );
};
