import React, {Component} from 'react';

export function isNullComponent (CheckingComponent) {
    return ({isNull, ...rest}) => isNull ? null : <CheckingComponent {...rest} />;
}
