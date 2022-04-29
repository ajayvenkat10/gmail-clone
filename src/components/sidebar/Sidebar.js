import { AccessTime, Duo, ExpandMore, Inbox, LabelImportant, NearMe, Note, Person, Phone, Star } from '@mui/icons-material';
import ComposeIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openSendMessage } from '../../features/mailSlice';
import './Sidebar.css';
import SidebarOption from './SidebarOption';

function Sidebar() {

    const dispatch = useDispatch();

    return (
        <div className="sidebar">
            <Button
                startIcon={<ComposeIcon fontSize="large"/>} 
                className='sidebar__compose'
                onClick={() => dispatch(openSendMessage())}
            >
                Compose
            </Button>

            <SidebarOption Icon={Inbox} title="Inbox" number={54} selected = {true}/>
            <SidebarOption Icon={Star} title="Starred" number={4}/>
            <SidebarOption Icon={AccessTime} title="Snoozed" number={3}/>
            <SidebarOption Icon={LabelImportant} title="Important" number={10}/>
            <SidebarOption Icon={NearMe} title="Sent" number={21}/>
            <SidebarOption Icon={Note} title="Drafts" number={7}/>
            <SidebarOption Icon={ExpandMore} title="More" number={"..."}/>

            <div className="sidebar__footer">
                <div className="sidebar__footerIcons">
                    <IconButton>
                        <Person />
                    </IconButton>
                    <IconButton>
                        <Duo/>
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Sidebar