import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../store/channelsSlice';

const ChannelActionsMenu = () => (
  <div
    x-placement="bottom-start"
    aria-labelledby=""
    className="dropdown-menu show"
    style={{
      position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate3d(74px, 38px, 0px)',
    }}
    data-popper-reference-hidden="false"
    data-popper-escaped="false"
    data-popper-placement="bottom-start"
  >
    <a href="#" className="dropdown-item" role="button">Удалить</a>
    <a href="#" className="dropdown-item" role="button">Переименовать</a>
  </div>
);

const UnremovableChannel = ({ channel, handleClick, active }) => {
  const labelBtnClassNames = `w-100 rounded-0 text-start btn ${active && 'btn-secondary'}`;

  return (
    <>
    <button onClick={handleClick} className={labelBtnClassNames}>
      <span className="me-1">
        #
      </span>
      {channel.name}
    </button>
  </>
  )
};

const RemovableChannel = ({ channel, handleClick, active }) => {
  const labelBtnClassNames = `w-100 rounded-0 text-start text-truncate btn ${active && 'btn-secondary'}`;
  const actionBtnClassNames = `flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${active && 'btn-secondary'}`;

  return (
    <div role="group" className="d-flex show dropdown btn-group">
      <button onClick={handleClick} className={labelBtnClassNames} type="button">
        <span className="me-1">#</span>
        {channel.name}
      </button>
      <button aria-haspopup="true" aria-expanded="true" className={actionBtnClassNames} />
    </div>
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
        ? <RemovableChannel channel={channel} handleClick={handleClick} active={channel.id === currentChannelId} />
        : <UnremovableChannel channel={channel} handleClick={handleClick} active={channel.id === currentChannelId} />}
    </li>
  );
};

export default Channel;

{ /* <button aria-haspopup="true" aria-expanded="false" type="button" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary" /> */ }
{ /*     <ChannelActionsMenu /> */ }
{ /*   </> */ }
