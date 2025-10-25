import React from "react";
import { useNavigate } from "react-router-dom";


const SearchList = ({ result }) => {
      const navigate=useNavigate();

  if (!result || result.length === 0) return null;


  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        color:"white",
        backgroundColor: "black",
        border: "1px solid #333",
        borderTop: "none",
        borderRadius: "0 0 6px 6px",
        maxHeight: "200px",
        marginLeft:"36%"
      }}
    >
      {result.map((k) => (
        <center>
        <div
          key={k._id}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) =>{
            e.currentTarget.style.backgroundColor = "#eee";
              e.currentTarget.style.color="#222";
            
          }}
          onClick={()=>{navigate('/searchProducts',{state:{result}});}}
        >
          {k.name}
        </div>
        </center>
      ))}
    </div>
  );
};

export default SearchList;
