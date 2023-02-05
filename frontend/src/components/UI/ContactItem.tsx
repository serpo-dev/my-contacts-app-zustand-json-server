import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import defaultSmallPic from "../../assets/defaultSmallPic.jpg";
import { Contact } from "../../zustand/interfaces";

interface ContactItemProps {
    loading?: boolean;
    data?: Contact;
}

export const ContactItem = (props: ContactItemProps) => {
    const { loading = false } = props;

    return (
        <Card sx={{ minWidth: 300, m: 2 }}>
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
                        <Skeleton animation="wave" height={10} width="40%" />
                    ) : props.data ? (
                        props.data.email
                    ) : null
                }
            />
        </Card>
    );
};
