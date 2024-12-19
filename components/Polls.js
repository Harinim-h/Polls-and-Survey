import React, { useState, useEffect } from 'react';
   import axios from 'axios';

   const Polls = () => {
       const [polls, setPolls] = useState([]);
       const [title, setTitle] = useState('');
       const [options, setOptions] = useState(['', '']);

       useEffect(() => {
           axios.get('/api/polls').then(res => setPolls(res.data));
       }, []);

       const createPoll = () => {
           axios.post('/api/polls', { title, options }).then(() => {
               setTitle('');
               setOptions(['', '']);
           });
       };

       return (
           <div>
               <h1>Create a Poll</h1>
               <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
               {options.map((opt, idx) => (
                   <input key={idx} value={opt} onChange={e => {
                       const newOptions = [...options];
                       newOptions[idx] = e.target.value;
                       setOptions(newOptions);
                   }} placeholder={`Option ${idx + 1}`} />
               ))}
               <button onClick={createPoll}>Create Poll</button>
               <h2>Existing Polls</h2>
               <ul>
                   {polls.map(poll => <li key={poll._id}>{poll.title}</li>)}
               </ul>
           </div>
       );
   };

   export default Polls;
   
