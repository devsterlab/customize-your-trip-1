import React, { PropTypes } from 'react';

const ConnectError = (props) =>
<div className="height-100 text-center connect-error">
    <h1 className="alert">Connection error!</h1>
    <h3 className="subheader">
        Cannot connect to the server. Check out your internet connection or try to refresh the page.
        It is also can be caused by problems on the server side.
    </h3>
</div>;

export default  ConnectError;