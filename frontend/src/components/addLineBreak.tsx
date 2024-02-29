import React from 'react';

type Props = {
    label: string;
}

export const ConvertDotsToLineBreaks = (props: Props) => {
    const { label } = props;

    return ( 
        label.split('・').map((part, index) => (
            <React.Fragment key={index}>
                {index !== 0 && <><br /></>}
                {part}
            </React.Fragment>
        ))
    )
}
