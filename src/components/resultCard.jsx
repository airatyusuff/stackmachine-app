
const ResultCard = ({ result, errorMsg }) => {

    return (
        <>
           <hr />
            <div className="card mt">
              {
                errorMsg ? 
                <p className="error">Error: <span>{errorMsg}</span></p> :
                <p className="success">Result: {result}</p>
              }
            </div>
        </>
    )
}

export default ResultCard