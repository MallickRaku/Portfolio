import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";
export const UserMessages = () => {
  const [listOfuserMessages, setListOfUserMessages] = useState([]);
  useEffect(() => {
    const getUserMessagesList = async () => {
      let temArray = [];
      const querySnapshot = await getDocs(collection(db, "userMessages"));
      querySnapshot.forEach((doc) => {
        temArray.push(doc.data());
        setListOfUserMessages(temArray);
      });
    };
    getUserMessagesList();
  }, []);
  return (
    <section id="userMessagesSection" data-aos="fade-up">
      <h3>User Messages</h3>
      <div className="userMessagesBox">
        {listOfuserMessages.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Message</th>
              </tr>
            </thead>
            <tbody>
              {listOfuserMessages.map((UserMsg) => {
                const { name, message, email } = UserMsg;
                return (
                  <tr key={email}>
                    <td>{name}</td>
                    <td> {message}</td>
                    <td> {email} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Not Found Any Message</p>
        )}

        <ul>
          {listOfuserMessages.length !== 0 ? (
            listOfuserMessages.map((UserMsg) => {
              const { message, email } = UserMsg;
              return (
                <li key={email}>
                  {message}
                  <span>{email}</span>
                </li>
              );
            })
          ) : (
            <p>Not Found Any Message</p>
          )}
        </ul>
      </div>
    </section>
  );
};
