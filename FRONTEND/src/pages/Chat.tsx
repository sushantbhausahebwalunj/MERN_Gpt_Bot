

















import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ChatItem from '../components/Chat/ChatItem';
import { useAuth } from '../context/AuthContext';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communitcators';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Message = { role: 'user', content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      // setChatMessages((prev) => [...prev, ...chatData.chats]);
      const newChatMessage: Message = chatData.newMessage; // Change here
      setChatMessages((prev) => [...prev, newChatMessage]); 
    } catch (error) {
      toast.error('Error sending chat request');
      console.log(error);
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting Chats', { id: 'deletechts' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Successfully Deleted Chats', { id: 'deletechts' });
    } catch (error) {
      console.log(error);
      toast.error('Deleting Chats Failed', { id: 'deletechts' });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading Chats', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Successfully Loaded', { id: 'loadchats' });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Loading Chats Failed', { id: 'loadchats' });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      navigate('/login');
    }
  }, [auth, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            bgcolor: 'rgb(17 , 29 , 39)',
            borderRadius: 5,
            height: '70vh',
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'black',
              color: 'white',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name &&
              auth.user.name
                .split(' ')
                .map((word) => word[0])
                .join('')}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: ' sans-sarif' }}>
            You are talking to a ChatBot
          </Typography>
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'Courier New , Courier, monospace',
              my: 2,
              p: 3,
            }}
          >
            You can ask a question related to knowledge, Business, Advice,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: '200px',
              mb: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': { bgcolor: red.A400 },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: '600',
          }}
        >
          Model-GPT 3.5 Turbo
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: '70vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17 ,17, 39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            type="text"
            ref={inputRef}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
