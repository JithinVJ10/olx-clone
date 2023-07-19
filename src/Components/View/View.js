import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../firebase/config';
import './View.css';
import { PostContext } from '../../store/postContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

function View() {

  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const firestore = getFirestore(firebase)
  const sellerId = postDetails && postDetails[0].userId 


  useEffect(()=>{
    if (sellerId) {
      const queryUser = query(collection(firestore,'users'),where('id', '==', sellerId))
      getDocs(queryUser).then((response)=>{
        if (response.empty) {
          console.log('User not Found');
        } else {
          setUserDetails(response.docs[0].data())
        }
      })
    }
  },[firestore, sellerId])

  return (
    <>
      { postDetails ? (

      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img
            src={postDetails[0].image}
            alt=""
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postDetails[0].price} </p>
            <span>{postDetails[0].name}</span>
            <p>{postDetails[0].category}</p>
            <span>{postDetails[0].createdDate}</span>
          </div>

          { userDetails && (

          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
          )}
        </div>
      </div>
      ) : (
        <div>No data please</div>
        )}
    </>
   
  );
}
export default View;
