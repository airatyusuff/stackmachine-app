
const ResultCard = ({ result, errorMsg }) => {

    return (
        <>
           <hr />
            <div className="card mt">
              {
                errorMsg ? <p>Error: <span>{errorMsg}</span></p> : <p>Result: {result}</p>
              }
            </div>
        </>
    )
}

export default ResultCard