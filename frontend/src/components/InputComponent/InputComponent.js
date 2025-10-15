import React, { Children, cloneElement } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const InputComponent = ({children, label}) =>{

    Children.map(children, child =>{
    
    })
    return(
        <div>
            <div>
                {label && <label>{label}</label>}
                <div>
                    {
                        Children.map(children, child =>{
                            if (React.isValidElement(child)){
                                return cloneElement(child, {
                                    className: `${child.props.className || ''} form-control`
                                })

                            }
                            return child;
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default InputComponent;