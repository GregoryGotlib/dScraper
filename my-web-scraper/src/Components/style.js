import styled from 'styled-components';

export const ResultContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
padding-top: 8px;
align-items: center;

.welcome-label-container{
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: center;
    background-color: #f7f7f7;
    border-radius: 11px;
    p{
        margin: 10px 0;
        padding:0 5px;
    }
    .user-name-welcome-label{
        color:blue;
    }
    .welcome-label{
        font-weight:500;
    }
}

.result-table-container{
    margin-top: 30px;
    width: 90%;
    @media (max-width:1024px){
        margin: 30px 30px 0 30px;
        width: auto;
        table{
            font-size:10px;
        }
    }
    
    tr{
        cursor:pointer;
    }
}

`;

export const SearchFormContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 8px;
    align-items: center;

.welcome-label-container{
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: center;
    background-color: #f7f7f7;
    border-radius: 11px;
    p{
        margin: 10px 0;
        padding:0 5px;
    }
    .user-name-welcome-label{
        color:blue;
    }
    .welcome-label{
        font-weight:500;
    }
}

    form{
        width: 67%;
        .form-control{
            direction: rtl;
            font-size: 12px;

            option:disabled{
            color: #a3a2a2;
            background-color: #f2f2f2;
            }
        } 

        label{
            color: #043f73;
        }

        .form-control:focus {
            background-color: #fff;
            border-color: #80bdff;
            outline: none;
            box-shadow: none;
        }

        .form-control:disabled{
            background-color: #f9f9f9;
            opacity: 1;
            cursor: not-allowed;
        }
    }
`;

export const HomeImgContainer = styled.img`

`;


export const HomeButtonsContainer = styled.div`

`;

export const HomeContainer = styled.div`
    .jumbotron{
        background-color:white;
    }

    #reg_button{
        padding: 20px;
        margin: 30px 10px;
    }
    
    #login_button{
        padding: 20px;
        margin: 30px 10px;
    }

`;


export const RegFormContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 80px;

    form{

        @media (max-width:1024px){
            padding: 30px;
        }

        .form-control{
            direction: rtl;
            font-size: 12px;
        } 

        .form-control:focus {
            background-color: #fff;
            border-color: #80bdff;
            outline: none;
            box-shadow: none;
        }

        Button{
            margin-top:15px;
        }
        
        a{
            margin-top:15px;
        }

        .form-group{
            .invalid-feedback{
                margin-top: 0;
                font-size: 12px;
            }
        }
    }
`;

export const NavbarContainer = styled.div`

    .navbar-expand{
        @media (max-width:1024px){
            justify-content: center;
        }
    }

    img{
        width:30px;
        height:30px;
        border-radius:6px;
    }

    #info-brand{
        color: #e3e3e3;
        &:hover{
            color:white;
        }
    }

    #logout-brand{
        color: #e3e3e3;
        &:hover{
            color:red;
        }
    }

    #data-brand{
        color: #e3e3e3;
        &:hover{
            color:yellow;
        }
    }

`;


export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid;
    margin: 22px 200px;
    padding: 30px 0px 26px 0px;
    border-radius: 22px;
    flex-direction: column;
    align-items: center;
    
    .tab-content{
        width:100%;
    }

    @media (max-width:1024px){
    margin:auto;
    border: none;
    border-bottom: 1px solid;
    border-radius: 0;
}

`;