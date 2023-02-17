import './Sidebar.css'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Avatar, IconButton } from '@mui/material';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PhotoIcon from '@mui/icons-material/Photo';
import ScreenLockRotationIcon from '@mui/icons-material/ScreenLockRotation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase/firebase';
import firebase from 'firebase/compat/app';
import { setSent } from '../features/sentSlice';

const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [subject, setSubject] = useState("")
  const [content ,setContent] =useState("")
  const [recipient, setRecipient] = useState("")

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const sent = useSelector(selectSent => selectSent.sent.value.sent)
    const inbox = useSelector(selectSent => selectSent.sent.value.inbox)


  const sendMail = (e) =>{
    e.preventDefault()
    if(recipient && content !== ""){
      db.collection("sentMails").add({
        from: user.email,
        to: recipient,
        subject: subject,
        content: content,
        user: user,
        sent: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setModalOpen(false)
      setContent("")
      setSubject("")
      setRecipient("")
      alert("Mail Sent Successfully")
    }
    else{
      alert("Fill all the fields")
    }

  }
  return (
    <div className='sidebar'>
      <div className='sidebarOptionsTop'>
        <div className='sidebarOption'>
          <img onClick={()=> setModalOpen(true)} 
          src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png" 
          alt="compose" />
          
        <Modal 
          isOpen={modalOpen}
          onRequestClose={()=> setModalOpen(false)}
          style={{
            overlay:{
              width:680,
              height:"auto",
              // backgroundColor: "rgba(0,0,0,0.8)",
              background:"transparent",
              zIndex:"1000",
              top:"50%",
              left:"50%",
              marginTop:"-250px",
              marginLeft:"-350px",
              borderRadius:"none"
            },
            content:{
              margin:0,
              padding:0,
              border:"none"
            },
          }}
        >
          <div className='modalContainer'>
            <div className='modalContainerTop'>
              <div className='modalHeader'>
                <p>New Message</p>
                <div className='modalHeaderIcons'>
                  <IconButton onClick={()=> setModalOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
              <div onClick={() => setFocus(true)}
              className="modalRecipient">
                <p>{focus ? "To" : "Recipient"}</p>
                <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} />
              </div>
              <div className='modalRecipient'>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
              </div>
              <div className='quill'>
                <ReactQuill 
                  value={content}
                  onChange={(value) => setContent(value)}
                  placeholder="Compose Your mail....."
                />
              </div>
            </div>
            <div className='modelContainerBottom'>
              <div className='modalBottom'>
                <button onClick={sendMail} >Send</button>
                <TextFormatIcon />
                <AttachFileIcon />
                <LinkIcon />
                <SentimentSatisfiedAltIcon />
                <PhotoIcon />
                <ScreenLockRotationIcon />
                <div className='modalBottomLast'>
                  <MoreVertIcon />
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </div>
        </Modal>
        </div>
        {
          inbox ? (
            <div className="sidebarOptionIcon" onClick={()=> dispatch(setSent({ sent:false , inbox: true}))} style={{backgroundColor: "#444", borderRadius:"50%",padding:"6px"}} >
            <InboxOutlinedIcon  />
        </div>
          ) : (
            <div className="sidebarOptionIcon" onClick={()=> dispatch(setSent({ sent:false , inbox: true}))} >
            <InboxOutlinedIcon  />
        </div>
          )
        }
        
        <div className='sidebarOptionIcon'  >
            <StarOutlineOutlinedIcon  />
        </div>
        <div className='sidebarOptionIcon'>
            <WatchLaterOutlinedIcon />
        </div>
        {
          sent ? (
            <div className='sidebarOptionIcon' onClick={()=> dispatch(setSent({ sent:true , inbox: false}))} style={{backgroundColor: "#444", borderRadius:"50%",padding:"6px"}} >
            <SendOutlinedIcon  />
        </div>
          ):(
            <div className='sidebarOptionIcon' onClick={()=> dispatch(setSent({ sent:true , inbox: false}))} >
            <SendOutlinedIcon  />
        </div>
          )
        }
        
        <div className='sidebarOptionIcon'>
            <InsertDriveFileOutlinedIcon />
        </div>
        <div className='sidebarOptionIcon'>
            <LabelImportantOutlinedIcon />
        </div>
      </div>
      <div className='sidebarOptionsBottom'>
        <div className='sidebarOptionIcon'>
          <img src="https://www.gstatic.com/images/icons/material/system/1x/meet_white_20dp.png" alt="meet" />
        </div>
        <div className='sidebarOptionIcon'>
            <VideocamIcon/>
        </div>
        <div className='sidebarOptionIcon'>
            <KeyboardIcon />
        </div>
      </div>
      <div className='sidebarBottomLast'>
        <div className='sidebarOptions'>
          <div className='sidebarOptionIcon'>
            <img src="https://www.gstatic.com/images/icons/material/system/1x/hangout_white_20dp.png" alt="hangout" />
          </div>
          <div className='sidebarOption'>
            <Avatar src={user.photo}  />
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar