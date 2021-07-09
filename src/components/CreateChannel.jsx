import React from 'react';
import CreateChannelForm from './CreateChannelForm';

const CreateChannel = ({ newChannelInputRef }) => (
  <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h4">Create channel</div>
          <button aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
        </div>
        <div className="modal-body">
          <CreateChannelForm newChannelInputRef={newChannelInputRef} />
        </div>
      </div>
    </div>
  </div>
);

export default CreateChannel;
