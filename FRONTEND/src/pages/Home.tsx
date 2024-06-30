import { Box } from '@mui/material';
import { TbBrandOpenai } from "react-icons/tb";
import Footer from '../components/footer/Footer';
import TypingAnim from '../components/typer/TypingAnim';




const Home = () => {
  // const theme = useTheme()
  // const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <Box width={"100%"} height={"100%"}  >
      <Box sx={{
        display:"flex",
        width:"100%",
        flexDirection:"column",
        alignItems:"center",
        mx:"auto",
        mt:3
      }} >

        <Box><TypingAnim/></Box>
        <Box sx={{width:"100%", display:"flex", flexDirection:{md: "row" , xs:"column" ,sm: "column"},
      gap: 5,
      my:2
      }}>
        <img src="/robot1.png" alt="robot" style={{width:"10rem" , margin:'auto'}} />
        <TbBrandOpenai className='image-inverted rotate' style={{fontSize:"10rem",margin:"auto"}} />

      </Box>
      <Box  sx={{display:"flex", width:"100%", mx:"auto"}}>
        <img src="chat.png" alt="chatbot" style={{
          display:"flex",
          margin:"auto",
          width:"60%",
          borderRadius:"20",
          boxShadow:"-5px -5px 105px #64f3d5",
          marginTop:20,
          marginBottom:8
        }} />

      </Box>
      <Footer/>
      </Box>
    </Box>
  )
}

export default Home