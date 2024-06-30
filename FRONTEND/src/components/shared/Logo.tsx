import { Typography } from '@mui/material';
import { TbBrandOpenai } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Logo = () => {
  return (
    <div style={{display:"flex",marginRight:"auto",alignItems:"center",gap:".5rem"}} >
        <Link to={'/'}> 
         <TbBrandOpenai style={{fontSize:"50px",color:"#E83845"}} />


        </Link>
        <Typography sx={{display:{md:"block",sm:"none",xs:"none"},mr:'auto',fontWeight:"800",textShadow:"2px 2px 20px #000",}} >
            <span style={{fontSize:"20px"}} >MERN</span>-GPT
        </Typography>
    </div>
  )
}

export default Logo