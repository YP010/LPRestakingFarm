import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: transparent;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1100px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #D3D3D3;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.0rem;
  height: 100%;
  font-size: 16px;
  cursor: pointer;
  

  &.active {
    color: #c37aff;
  }
  &:hover {
    text-decoration: none;
    color: #04f7ff;
  }
`;


export const NavLink0 = styled(Link)`
  color: #D3D3D3;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.0rem;
  height: 100%;
  font-size: 16px;
  cursor: pointer;

  &.active {
    color:  #D3D3D3;
  }
  &:hover {
    text-decoration: none;
    color: #04f7ff;
  }
`;

export const NavLinkHome = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.0rem;
  height: 100%;
  font-size: 20px;
  cursor: pointer;

  &.active {
    color:  #fff;
  }
  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;

export const NavLink2 = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.0rem;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  color: #c37aff;

  &.active {
    color: #c37aff;
  }
  &:hover {
    text-decoration: none;
    color: #04f7ff;
  }
`;

export const NavLinkSub = styled(Link)`
  color: #D3D3D3;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.2rem;
  height: 100%;
  font-size: 16px;
  cursor: pointer;
  border: 0px;
  border-bottom: 0.1px solid rgb(187, 187, 187);
  

  &.active {
    color: #c37aff;
  }
  &:hover {
    text-decoration: none;
    color: #04f7ff;
  }
`;

export const NavLinkSub1 = styled(Link)`
  color: #D3D3D3;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.2rem;
  height: 100%;
  font-size: 16px;
  cursor: pointer;
  border: 0px;
  

  &.active {
    color: #c37aff;
  }
  &:hover {
    text-decoration: none;
    color: #04f7ff;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink0 = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
export const NavBtnLink1 = styled(Link)`
  border-radius: 4px;
  background: #ff0000;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
export const NavBtnLink2 = styled(Link)`
  border-radius: 4px;
  background: #228B22;
  padding: 10px 22px;
  color: 	#fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;