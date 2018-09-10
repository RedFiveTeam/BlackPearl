import * as React from 'react';
import { Routes } from './Routes';
import { withRouter } from 'react-router';

export const WrappedRoutes = withRouter((Routes as any));

export class App extends React.Component {
    render() {
        return (
            <WrappedRoutes/>
        );
    }
}