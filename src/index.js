import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Footer from './components/Footer.jsx';

ReactDOM.render(
    <div
        style={{
            marginRight: '50%',
        }}
    >
        <App />
    </div>,
    document.getElementById('root')
);

ReactDOM.render(
    <div>
        <Footer></Footer>
    </div>,
    document.getElementById('footer')
);
