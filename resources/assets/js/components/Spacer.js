import React from 'react'

const style = {
    width: "100%",
    margin: "0 0 10px 0",
    borderBottom: "1px solid rgb(228, 228, 228)",
};

export const Spacer = () => <div style={style}></div>;

export const withSpacer = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <div>
                    <Spacer/>
                    <Component {...this.props}/>
                </div>
            );
        }
    };

};