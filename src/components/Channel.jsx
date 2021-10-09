import { Dropdown } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../store/channelsSlice';
import { showModal } from '../store/modalSlice';

const UnremovableChannel = ({ channel, handleClick, active }) => {
  const labelBtnClassNames = `w-100 rounded-0 text-start btn ${active && 'btn-secondary'}`;

  return (
    <>
      <button type="button" onClick={handleClick} className={labelBtnClassNames}>
        <span className="me-1">
          #
        </span>
        {channel.name}
      </button>
    </>
  );
};

const RemovableChannel = ({ channel, handleClick, active }) => {
  const dispatch = useDispatch();
  const labelBtnClassNames = `w-100 rounded-0 text-start text-truncate btn ${active && 'btn-secondary'}`;
  const handleDeletion = () => {
    dispatch(showModal({ type: 'DeleteChannelConfirmationModal', channelId: channel.id }));
  };
  const handleRenaming = () => {
    dispatch(showModal({ type: 'RenameChannelModal', channelId: channel.id }));
  };

  return (
    <>
      <div role="group" className="d-flex show dropdown btn-group">
        <button onClick={handleClick} className={labelBtnClassNames} type="button">
          <span className="me-1">#</span>
          {channel.name}
        </button>
        <Dropdown>
          <Dropdown.Toggle variant={active ? 'secondary' : 'inverted'} />

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDeletion}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={handleRenaming}>Rename</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentChannelId(channel.id));
  };
  const { currentChannelId } = useSelector((state) => state.channels);

  return (
    <li className="nav-item w-100">
      {channel.removable
        ? (
          <RemovableChannel
            channel={channel}
            handleClick={handleClick}
            active={channel.id === currentChannelId}
          />
        ) : (
          <UnremovableChannel
            channel={channel}
            handleClick={handleClick}
            active={channel.id === currentChannelId}
          />
        )}
    </li>
  );
};

export default Channel;
