import { ArrowDropDown, ChevronLeft, ChevronRight, Inbox, KeyboardHide, LocalOffer, MoreVert, People, Redo, Settings } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/Firebase'
import './EmailList.css'
import EmailRow from './widgets/EmailRow'
import Section from './widgets/Section'

function EmailList() {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const collections = query(collection(db, 'emails'), orderBy('timestamp', 'desc'));
            const dbSnapshot = await getDocs(collections);
            console.log("Called fetchData");
            setEmails(
                dbSnapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    })
                )
            );
        }

        fetchData();
    }, []);

    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDown />
                    </IconButton>
                    <IconButton>
                        <Redo />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton>
                        <ChevronRight />
                    </IconButton>
                    <IconButton>
                        <KeyboardHide />
                    </IconButton>
                    <IconButton>
                        <Settings />
                    </IconButton>
                </div>
            </div>

            <div className="emailList__sections">
                <Section Icon={Inbox} title='Primary' color={'red'} selected={true} />
                <Section Icon={People} title='Social' color={'#1A73E8'} />
                <Section Icon={LocalOffer} title='Promotions' color={'green'} />
            </div>

            <div className="emailList__list">
                {emails.map(({id, data: {to, subject, message, timestamp}}) => (
                    <EmailRow
                        key={id}
                        id={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                ))}
            </div>
        </div>
    )
}

export default EmailList