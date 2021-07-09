import React, { useEffect } from 'react';

const CreateChannel = ({ newChannelInputRef }) => {
  useEffect(() => {
    newChannelInputRef.current.focus();
  }, [newChannelInputRef]);

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Create channel</div>
            <button aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
          </div>
          <div className="modal-body">
            <form className="">
              <div className="form-group">
                <input ref={newChannelInputRef} name="name" data-testid="add-channel" className="mb-2 form-control" value="" />
                <div className="invalid-feedback" />
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary">
                    Отменить
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Отправить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
