import React, { Component } from 'react'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTelegram, FaReddit, FaMedium } from 'react-icons/fa';
import { AiFillMail } from 'react-icons/ai';
import { MdForum } from 'react-icons/md';

import './App.css';

class Footer extends Component {
  render() {
    return (
      <div style={{width:"100%", backgroundColor:"#28313b", textAlign:"center", color: "silver", padding:"35px 10px", marginTop:"100px"}}>
      <div className="mb-3" style={{fontSize:"12px"}}>Copyright © 2022 Pundi X Labs Pte. Ltd. ® All rights reserved.</div>
      <div style={{fontSize:"20px"}}>
        <AiFillMail onClick={() => {
          window.open(`mailto:contact@pundix.com`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaFacebook onClick={() => {
          window.open(`https://www.facebook.com/pundixlabs`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaTwitter onClick={() => {
          window.open(`https://twitter.com/Pursetoken`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaTelegram onClick={() => {
          window.open(`https://t.me/Pundix`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaLinkedin onClick={() => {
          window.open(`https://www.linkedin.com/company/13423325`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaReddit onClick={() => {
          window.open(`https://www.reddit.com/r/PundiX`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaYoutube onClick={() => {
          window.open(`https://www.youtube.com/channel/UCOIf6WeLEzZi3DQxzenTZeA`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaInstagram onClick={() => {
          window.open(`https://www.instagram.com/pundi_x`, '_blank')
          }}/>&nbsp;&nbsp;
        <FaMedium onClick={() => {
          window.open(`https://medium.com/pundix`, '_blank')
          }}/>&nbsp;&nbsp;
        <MdForum onClick={() => {
          window.open(`https://forum.functionx.io`, '_blank')
          }}/>
      </div>
    </div>
    );
  }
}

export default Footer;
