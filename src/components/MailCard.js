import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Checkbox, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PrintIcon from '@mui/icons-material/Print';
import LaunchIcon from '@mui/icons-material/Launch';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ForwardIcon from '@mui/icons-material/Forward';
import Forward from '@mui/icons-material/Forward';
import './MailCard.css'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardIcon from '@mui/icons-material/Keyboard';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import ReactHtmlParser from 'html-react-parser'
import { selectMailId } from '../features/mailSlice';
import {setMailId} from '../features/mailSlice'
import firebase from 'firebase/compat/app';
import { selectSent } from '../features/sentSlice';
// import { selectInbox } from '../features/inboxSlice';


function SimpleAccordion({Id, mail, key}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [focus, setFocus] = useState(false)
    const [subject, setSubject] = useState(mail.subject)
    const [content ,setContent] =useState("")
    const [recipient, setrecipient] = useState(mail.to)
  
    const [forward, setForward] = useState(false)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const mailId = useSelector(selectMailId)
    

    const [repliedMails, setRepliedMails] = useState([])
    const [forwardMails, setForwardedMails] = useState([])

    const [forwarded, setForwarded] = useState(false)
    const [replied, setReplied] = useState(false)

    const handleReply = () =>{
      setModalOpen(true)
      setForward(false)
    }
  
    const handleForward = () =>{
      setModalOpen(true)
      setForward(true)
    }

    const sendMail =(id) => {
      forward ? addForward(id.mailId) : addReply(id.mailId)
      
    }

    const addReply = (id) =>{
      console.log(id)
     if(id) {
      db.collection('sentMails').doc(id).collection('repliedMails').add({
        from: user.email,
        to: recipient,
        subject: `re<${subject}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        replied: true,
        content: content,
        id: id,
        user: user
      })
      alert("Mail replied successfully...")
      setModalOpen(false)
      setContent("")
     }
    }
    const addForward = (id) =>{
      if(id) {
        db.collection('sentMails').doc(id).collection('forwardedMails').add({
          from: user.email,
          to: recipient,
          subject: `fwd<${subject}`,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          content: content,
          forwarded: true,
          id: id,
          user: user
        })
        alert("Mail forwarded successfully...")
        setModalOpen(false)
        setContent("")
       }
    }


    useEffect(()=>{
      if(mailId?.mailId) {
        db.collection('sentMails').doc(mailId.mailId).collection('repliedMails')
        .orderBy('timestamp','desc').onSnapshot((snapshot)=> setRepliedMails(snapshot.
          docs.map((doc) => ({
            id: doc.id,
            reMail: doc.data()
          }))) )
          setReplied(true)
      }
    },[mailId])

    useEffect(()=>{
      if(mailId?.mailId) {
        db.collection('sentMails').doc(mailId.mailId).collection('forwardedMails')
        .orderBy('timestamp','desc').onSnapshot((snapshot)=> setForwardedMails(snapshot.
          docs.map((doc) => ({
            id: doc.id,
            fwdMail: doc.data()
          }))) )
          setForwarded(true)
      }
    },[mailId])
    
    const sent = useSelector(selectSent => selectSent.sent.value.sent)
    const inbox = useSelector(selectSent => selectSent.sent.value.inbox)
    
    const handleDelete = (id) =>{
      db.collection('sentMails').doc(id).delete()
        .then(()=>{ alert("Mail Deleted..")})
        .catch((err)=> alert(err.message))
    }

    return (
      <div className='mailCards'>
        {/* ---------------------------------------------------------------------------- */}
         {
          (sent && (user.email === mail.from) ) ? (
            <div>
            <Accordion key={key} onClick={() => dispatch(setMailId({
              mailId: Id
            })) } >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className='accordMid'>
                  <div className='accordLeft'>
                    <Checkbox />
                    <StarIcon />
                    <Typography className="User" >
                    {
                      mail.user.email === user.email
                      ? "me" 
                      : mail.from //.toString().spilt("@")[0].trim()
                    }
                  
                    </Typography>
                  </div>
                  <div className='accordMidDate'>
                  <Typography className="subject" style={{color:"white",paddingLeft:"5px"}} >{mail.subject}</Typography>
                  <p style={{color:"white",paddingLeft:"5px"}} >Click here to see Mail content</p>
                  </div>
                </div>
                <div className='accordMidMain'>
                <Typography className="time" style={{color:"white",paddingLeft:"5px"}} >
                  {
                    new Date(mail.timestamp?.toDate()).toLocaleString()
                  }
                
                </Typography>
                <DeleteIcon onClick={()=> handleDelete(Id)} />
                </div>
                
              </AccordionSummary>
              <AccordionDetails>
                <div className='accordDetails'>
                  <div className='accordDetailsTop'>
                    <p>subject</p>
                    <div className='accordDetailsTopRight'>
                      <PrintIcon />
                      <LaunchIcon />
                    </div>
                  </div>
                  <div className='accordDetailsInfo'>
                    <Avatar src={mail.user.photo}  />
                    <div className='sendersInfo'>
                      <h4>{mail.user.DisplayName}<small>{mail.from}</small></h4>
                      <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
                    </div>
                    <div className='senderInfoDate'>
                      <div className='senderInfoDateOption'>
                        <small>{new Date(mail.timestamp?.toDate()).toLocaleString()}</small>
                        <StarIcon />
                        <ReplyIcon />
                        <MoreVertIcon />
                        
                      </div>
                    </div>
                  </div>
                  <div className='mailContent'>
                    <div className='mailContentAccord'>
                      {/* ReactHtmlParser:- it convert HTML strings into React components   */}
                      { ReactHtmlParser(mail.content)}
              
                    </div>
              <Modal 
                isOpen={modalOpen}
                onRequestClose={()=> setModalOpen(false)}
                style={{
                  overlay:{
                    width:680,
                    height:"auto",
                    backgroundColor: "rgba(0,0,0,0.8)",
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
                      <p>{ forward ? 'Forward' : 'Reply'}</p>
                      <div className='modalHeaderIcons'>
                        <IconButton onClick={()=> setModalOpen(false)}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div onClick={() => setFocus(true)}
                    className="modalRecipient">
                      <p>{focus ? "To" : "Recipient"}</p>
                      <input type="text" value={recipient} onChange={e => setrecipient(e.target.value)} />
                    </div>
                    <div className='modalRecipient'>
                      <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
                    </div>
                    <div className='quill'>
                      <ReactQuill 
                        value={content}
                        onChange={(value) => setContent(value)}
                        placeholder={forward ? "Add content then forward mail..." : "Add reply to this mail..." }
                      />
                    </div>
                  </div>
                  <div className='modelContainerBottom'>
                    <div className='modalBottom'>
                      <button onClick={(e)=>sendMail(mailId)} >{ forward ? "Forward": "Reply"}</button>
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
              {
                replied && 
                  repliedMails.map(({ id, reMail }) => (
                    <ReplyMails key={id} id={id} mail={reMail} />
                  ))
              }
              {
                forwarded && 
                forwardMails.map(({ id, fwdMail }) => (
                  <ForwardMails key={id} id={id} mail={fwdMail} />
                ))
              }
                    <div className='mailReplyLinks'>
                      <div className='mailReplyLink'onClick={handleReply}>
                        <ReplyIcon />
                        <a  href="#">Reply</a>
                      </div>
                      <div className='mailReplyLink'onClick={handleForward}>
                        <Forward />
                        <a  href="#">forward</a>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          // -----------------------------------------------------------------------------------------------
          ) : ("")
         }
         
{/* --------------------------------------------------- */}

        {
          (inbox && (user.email === mail.to) ) ? (
            <div>
            <Accordion key={key} onClick={() => dispatch(setMailId({
              mailId: Id
            })) } >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className='accordMid'>
                  <div className='accordLeft'>
                    <Checkbox />
                    <StarIcon />
                    <Typography className="User" >
                    {
                      mail.user.email === user.email
                      ? "me" 
                      : mail.from //.toString().spilt("@")[0].trim()
                    }
                  
                    </Typography>
                  </div>
                  <div className='accordMidDate'>
                  <Typography className="subject" style={{color:"white",paddingLeft:"5px"}} >{mail.subject}</Typography>
                  <p style={{color:"white",paddingLeft:"5px"}} >Click here to see Mail content</p>
                  </div>
                </div>
                <div className='accordMidMain'>
                <Typography className="time" style={{color:"white",paddingLeft:"5px"}} >
                  {
                    new Date(mail.timestamp?.toDate()).toLocaleString()
                  }
                
                </Typography>
                </div>
                
              </AccordionSummary>
              <AccordionDetails>
                <div className='accordDetails'>
                  <div className='accordDetailsTop'>
                    <p>subject</p>
                    <div className='accordDetailsTopRight'>
                      <PrintIcon />
                      <LaunchIcon />
                    </div>
                  </div>
                  <div className='accordDetailsInfo'>
                    <Avatar src={mail.user.photo}  />
                    <div className='sendersInfo'>
                      <h4>{mail.user.DisplayName}<small>{mail.from}</small></h4>
                      <small>{`To ${mail.to === user.email ? "me" : mail.to}`}</small>
                    </div>
                    <div className='senderInfoDate'>
                      <div className='senderInfoDateOption'>
                        <small>{new Date(mail.timestamp?.toDate()).toLocaleString()}</small>
                        <StarIcon />
                        <ReplyIcon />
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>
                  <div className='mailContent'>
                    <div className='mailContentAccord'>
                      {/* ReactHtmlParser:- it convert HTML strings into React components   */}
                      { ReactHtmlParser(mail.content)}
              
                    </div>
              <Modal 
                isOpen={modalOpen}
                onRequestClose={()=> setModalOpen(false)}
                style={{
                  overlay:{
                    width:680,
                    height:"auto",
                    backgroundColor: "rgba(0,0,0,0.8)",
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
                      <p>{ forward ? 'Forward' : 'Reply'}</p>
                      <div className='modalHeaderIcons'>
                        <IconButton onClick={()=> setModalOpen(false)}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div onClick={() => setFocus(true)}
                    className="modalRecipient">
                      <p>{focus ? "To" : "Recipient"}</p>
                      <input type="text" value={recipient} onChange={e => setrecipient(e.target.value)} />
                    </div>
                    <div className='modalRecipient'>
                      <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
                    </div>
                    <div className='quill'>
                      <ReactQuill 
                        value={content}
                        onChange={(value) => setContent(value)}
                        placeholder={forward ? "Add content then forward mail..." : "Add reply to this mail..." }
                      />
                    </div>
                  </div>
                  <div className='modelContainerBottom'>
                    <div className='modalBottom'>
                      <button onClick={(e)=>sendMail(mailId)} >{ forward ? "Forward": "Reply"}</button>
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
              {
                replied && 
                  repliedMails.map(({ id, reMail }) => (
                    <ReplyMails key={id} id={id} mail={reMail} />
                  ))
              }
              {
                forwarded && 
                forwardMails.map(({ id, fwdMail }) => (
                  <ForwardMails key={id} id={id} mail={fwdMail} />
                ))
              }
                    <div className='mailReplyLinks'>
                      <div className='mailReplyLink'onClick={handleReply}>
                        <ReplyIcon />
                        <a  href="#">Reply</a>
                      </div>
                      <div className='mailReplyLink'onClick={handleForward}>
                        <Forward />
                        <a  href="#">forward</a>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          // -----------------------------------------------------------------------------------------------
          ) : ("")
         }

      </div>
    )
  }
  
  const ReplyMails = ({ key, id, mail}) =>{
    const user = useSelector(selectUser)
    return (<>
      <div className='repliedMail'>
        <div className='repliedMailContainer'>
          <div className='repliedMailTop'>
            <h5>{`<replied mail>`}</h5>
          </div>

          <div className='repliedMailMid'>
            <p style={{ margin: "0px 10px", paddingBottom:"10px", fontWeight:"500"}} >{mail.subject}</p>
          <div className='accordDetailsInfo'>
            <Avatar src={mail.user.photo} />
            <div className='sendersInfo'>
              <h4>
                {mail.user.DisplayName}
                <small>{mail.from}</small>
              </h4>
              <small>{`To ${mail.to === user.email ? "me" : mail.to }`}</small>
            </div>
            <div className='sendersInfoDate'>
              <div className='sendersInfoDateOption'>
                <small>
                  {new Date(mail.timestamp?.toDate()).toLocaleString()}
                </small>
                <StarIcon />
                <ReplyIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className='mailContent'>
          <div className='mailContentAccord'>
            {ReactHtmlParser(mail.content)}
          </div>
        </div>
      </div>
    </>)
  }
  const ForwardMails = ({ key, id, mail}) =>{
    const user = useSelector(selectUser)
    return (<>
     <div className='repliedMail'>
        <div className='repliedMailContainer'>
          <div className='repliedMailTop'>
            <h5>{`<Forwarded mail>`}</h5>
          </div>

          <div className='repliedMailMid'>
            <p style={{ margin: "0px 10px", paddingBottom:"10px", fontWeight:"500"}} >{mail.subject}</p>
          <div className='accordDetailsInfo'>
            <Avatar src={mail.user.photo} />
            <div className='sendersInfo'>
              <h4>
                {mail.user.DisplayName}
                <small>{mail.from}</small>
              </h4>
              <small>{`To ${mail.to === user.email ? "me" : mail.to }`}</small>
            </div>
            <div className='sendersInfoDate'>
              <div className='sendersInfoDateOption'>
                <small>
                  {new Date(mail.timestamp?.toDate()).toLocaleString()}
                </small>
                <StarIcon />
                <ReplyIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className='mailContent'>
          <div className='mailContentAccord'>
            {ReactHtmlParser(mail.content)}
          </div>
        </div>
      </div>
    
    </>)
  }

  const MailCard = () =>{

    const[mails, setMails] = useState([])
    const [show, setShow] = useState(false)
    const [userMails, setUserMails] = useState([])
    const user = useSelector(selectUser)

    useEffect(()=>{
      db.collection("sentMails").orderBy('timestamp','desc').onSnapshot(
        (snapshot) => setMails(snapshot.docs.map((doc) => ({
          id: doc.id,
          mail: doc.data()
        }))))
    },[])

    useEffect(()=>{
      if (mails.length !== 0) {
        mails.map(({id,mail})=>{
          if(user.email === mail.to || user.email === mail.from){
            setShow(true)
            setUserMails(mail)
          }
        })
      }
    },[mails, user.email])

    return (
        <div className='mailCards'>
           {
        show && mails.map(({id, mail})=>{
          if(user.email === mail.to || user.email === mail.from) {
            return(
              <>
                <SimpleAccordion key={id} Id={id} mail={mail} />
              </>
            )
          }
            })}
        </div>
          )
        }

        export default MailCard