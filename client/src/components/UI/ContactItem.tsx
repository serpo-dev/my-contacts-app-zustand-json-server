import { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import defaultSmallPic from "../../assets/defaultSmallPic.jpg";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { Contact } from "../../interfaces";
import deleteIcon from "../../assets/deleteIcon.png";
import addIcon from "../../assets/addIcon.png";
import { addContact, removeContact } from "../../async/contactsAsync";

interface ContactItemProps {
    loading?: boolean;
    data?: Contact;
}

export const ContactItem = (props: ContactItemProps) => {
    const { loading = false } = props;
    let isAddedProps = props.data && props.data.isAdded;
    const id = props.data && props.data.id;

    const [isAdded, setIsAdded] = useState(isAddedProps);
    const [isFetching, setIsFetching] = useState(false);

    const click = async () => {
        setIsFetching(true);
        const action = async () =>
            isAdded ? await removeContact(id) : await addContact(id);

        const result = await action();

        new Promise((res) => res(result)).then((res) =>
            res ? setIsAdded(!isAdded) : null
        );

        return setIsFetching(false);
    };

    const icon = () => {
        if (isFetching) {
            return (
                <div className="mt-1 mr-1">
                    <CircularProgress color="inherit" size={25} />
                </div>
            );
        }

        return (
            <IconButton className="h-[36px] w-[36px]" onClick={click}>
                <img
                    className="h-full w-full"
                    src={isAdded ? deleteIcon : addIcon}
                />
            </IconButton>
        );
    };

    return (
        <Card
            className="flex flex-row hover:brightness-95 active:brightness-90"
            sx={{ minWidth: 300, m: 2 }}
        >
            {" "}
            <NavLink to={`/profile?id=${id}`}>
                <CardHeader
                    avatar={
                        loading ? (
                            <Skeleton
                                animation="wave"
                                variant="circular"
                                width={40}
                                height={40}
                            />
                        ) : (
                            <Avatar
                                alt={props.data ? props.data.email : ""}
                                src={
                                    props.data
                                        ? props.data.smallPic
                                        : defaultSmallPic
                                }
                            />
                        )
                    }
                    title={
                        loading ? (
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />
                        ) : props.data ? (
                            [props.data.name, props.data.surname].join(" ")
                        ) : null
                    }
                    subheader={
                        loading ? (
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="40%"
                            />
                        ) : props.data ? (
                            props.data.email
                        ) : null
                    }
                />
            </NavLink>
            <div className="grow" />
            <div className="flex justify-center items-center  mr-6">
                {icon()}
            </div>
        </Card>
    );
};
