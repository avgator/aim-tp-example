import React from "react";
import { useAppSelector } from "../app/hooks";
import { store } from "../app/store";
import Configuration from "../components/configuration/configuration";

export const requireConfiguration = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P> {
        render() {
            const { ...props } = this.props;
            const restoredURLString = localStorage.getItem("api");


            const isConfigured = () => {
                let response = false;
                    if (restoredURLString == '' || restoredURLString == null) {
                        response = true
                    };
                return response
            }
            return isConfigured() ? <Configuration/> : <Component {...props as P} />;
  }
}