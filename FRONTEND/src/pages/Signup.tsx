import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { IoIosLogIn } from 'react-icons/io'
import CustomizedInput from '../components/shared/CustomizedInput'
import { toast } from 'react-hot-toast'
import {useAuth} from "../context/AuthContext"
import {  useNavigate } from 'react-router-dom'

const Signup = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const  handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   const formData = new FormData(e.currentTarget)
   const name = formData.get("name") as string

   const email = formData.get("email") as string
   const password = formData.get("password") as string
   try {
    toast.loading("Signing Up!",{id:"signup"})
    await auth?.signup(name , email,password)
    toast.success("Signed Up Successfully",{id:"signup"})

   } catch (error) {
    console.log(error)
    toast.error("Sign Up Failed",{id:"signup"})

   }
  }
useEffect(()=>{
 if(auth?.user){
  return navigate("/chat")
 }
},[auth])

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}> 
      <Box padding={8} mt={8} display={{md:"flex",sm:"none" , xs:"none"}}>
        <img src="himain.png" alt="Robot" style={{width:"350px"}} className='himan' />
      </Box>
      <Box  display={"flex"} flex={{xs:1,md:.5}} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
     <form onSubmit={ handleSubmit} style={{margin:"auto",padding:"30px",boxShadow:"10px 10px 20px #000",borderRadius:"10px",border:"none"}} >
      <Box sx={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
        <Typography variant='h4' textAlign={"center"} padding={2} fontWeight={600} >Signup</Typography>
        <CustomizedInput type='text' label='Name' name='name' />

        <CustomizedInput type='email' label='Email' name='email' />
        <CustomizedInput type='password' label='Password' name='password' />
        <Button type='submit' sx={{
          px: 2, py: 1, color:'white', mt:2, width:"400px",borderRadius:2,bgcolor: "#00fffc",
          ":hover":{bgcolor:'blue',color:"white",}
        }}
        endIcon={<IoIosLogIn/>}
        >Login</Button>

      </Box>
     </form>
      </Box>
    </Box>
  )
}

export default Signup