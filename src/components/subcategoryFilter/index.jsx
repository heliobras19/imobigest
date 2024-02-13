import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import getFinal from "../getFinal";
import Link from "next/link";

export default function SubcategoryFilter({ category, colors, flags }) {
  const router = useRouter();

  // const [ignorePriceFilter, setIgnorePriceFilter] = useState(true);
  // const [rangeValue, setRangeValue] = useState({ min: 5, max: 50 });
  // const handleValue = (value) => {
  //   console.log("new values", value);
  //   setRangeValue(value);
  // }

  function getParamsWithout(params, key) {
    const newParams = { ...params };
    delete newParams[key];
    delete newParams.slug;

    return newParams;
  }

  const addToFilter = (key, value) => {
    const currentParams = router.query;
    const newParams = getParamsWithout(currentParams, key);

    let newValue = value;

    router.push({
      pathname: `/subcategorias/${router.query.slug}`,
      query: {
        ...newParams,
        [key]: newValue,
      },
    });
  };


    const subcategoryChoose = (key, value) => {
        const currentParams = router.query;
            const newParams = getParamsWithout(currentParams, key);

            let newValue = value;
            return `/subcategorias/${newValue}`
    }

  const removeToComponent = (key) => {
    const currentParams = router.query;
    const newParams = getParamsWithout(currentParams, key);

    router.push({
      pathname: `/subcategorias/${router.query.slug}`,
      query: newParams,
    });
  };

  // useEffect(() => {

  //   if (!ignorePriceFilter) {
  //     setTimeout(() => {
  //       console.log("Chamar a URL para filtrar por faixa de preço", rangeValue);
  //       addToFilter("preco", `${rangeValue.min}-${rangeValue.max}`);
  //     }, 500);
  //   } else {
  //     setIgnorePriceFilter(false);
  //   }

  // }, [rangeValue]);

  return (
    <>
      {category && category?.descendants.length > 0 ? (
        <>
          <h4 className={`mt-4 mb-4`}>Sub-Categorias</h4>
          {category?.descendants.map((descendente) => (
            <>
              <div className="btn-group" key={`subcat-index${descendente.id}`}>
                  <Link
                    href={subcategoryChoose("subcategory", descendente.slug)}
                  key={descendente.id}
                  className="btn btn-link btn-block"
                >
                  {descendente.name}
                </Link>

                {router.query?.subcategory == descendente.slug && (
                  <button
                    className=" btn pl-4 pr-4"
                    onClick={() =>
                      removeToComponent("subcategory", descendente.slug)
                    }
                  >
                    x
                  </button>
                )}
              </div>
            </>
          ))}
        </>
      ) : 
         category?.brothers && category.brothers.length > 0 && (
        <>
          <h4 className={`mt-4 mb-4`}>Sub-Categorias</h4>
          {category?.brothers.map((descendente) => (
            <>
              <div className="btn-group" key={`subcat-index${descendente.id}`}>
                <Link
                    href={subcategoryChoose("subcategory", descendente.slug)}
                  key={descendente.id}
                  className="btn btn-link btn-block"
                >
                  {descendente.name}
                </Link>


                {router.query?.subcategory == descendente.slug && (
                  <button
                    className=" btn pl-4 pr-4"
                    onClick={() =>
                      removeToComponent("subcategory", descendente.slug)
                    }
                  >
                    x
                  </button>
                )}
              </div>
            </>
          ))}
        </>
      )
    }

      {/* <div className={`px-2 mb-5 pb-4`}>
        <hr />

        <h5 className={`mt-4 mb-5 pb-2`}>Faixas de Preços (unidade)</h5>

        <InputRange
          // draggableTrack
          maxValue={100}
          minValue={1}
          formatLabel={value => `R$ ${value}`}
          allowSameValues={false}
          step={10}
          value={rangeValue}
          onChange={value => handleValue(value)} 
          onChangeComplete={value => console.log('VALOR ATUAL', value)}
        />
      </div> */}

      <div className={`px-2 mb-4`}>
        <hr />

        <h5 className={`mt-4 mb-4`}>Cores</h5>

        <div className={`${styles.colorFilter}`}>
        {console.log(colors)}  
        {colors.map((color, index) => (
            <>
              <div className={styles.colorItem}>
                <span
                  onClick={() =>  addToFilter("color", color.slug.toLowerCase())}
                  key={`color-filter-${index}`}
                    style={{backgroundColor: `${color.hex}`}}
                  className={`${
                    styles.color
                  } color-${color.slug.toLowerCase()} ${
                    router.query?.color == color.slug.toLowerCase()
                      ? styles.active
                      : ""
                  }`}
                  title={color.name}
                ></span>

                {router.query?.color == color.slug.toLowerCase() && (
                  <span className={styles.colorBadge}>
                    <button
                      className="border-0 btn-outline-danger btn btn-sm"
                      onClick={() =>
                        removeToComponent("color", color.slug.toLowerCase())
                      }
                    >
                      x
                    </button>
                  </span>
                )}
              </div>
            </>
          ))}
        </div>
      </div>

      {flags?.length > 0 && (
        <div className={`px-2 mb-4`}>
          <hr />

          <h5 className={`mt-4 mb-4`}>Tags</h5>

          <div>
            {flags.map((flag) => {
              return (
                <>
                  <div
                    className="btn-group w-100"
                    key={`flag-c-index-${flag.id}`}
                  >
                    <button
                      onClick={() => addToFilter("flag", flag.slug)}
                      key={flag.id}
                      className="btn btn-link btn-block"
                    >
                      {flag.name}
                    </button>

                    {router.query?.flag == flag.slug && (
                      <button
                        className=" btn pl-4 pr-4"
                        onClick={() => removeToComponent("flag", flag.slug)}
                      >
                        x
                      </button>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
