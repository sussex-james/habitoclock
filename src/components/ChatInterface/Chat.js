import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";


// Pass a JSX component to forward conversation
const Chat = ({forcedActionButtons, messages, setMessages, onNextMessage=false}) => {
    // me and computer from

    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = () => {
        if (!inputMessage.trim().length) {
            return;
        }
        const data = inputMessage;

        if (onNextMessage !== false && inputMessage.length > 0) {
            console.log('Calling onnextMessage!')
            onNextMessage(inputMessage);
            return;
        }

        setMessages((old) => [...old, { from: "me", text: data }]);
        setInputMessage("");

        setTimeout(() => {
            setMessages((old) => [...old, { from: "computer", text: data }]);
        }, 1000);
    };

    return (
        <Flex w="100%" h="100vh" justify="center" align="center">
            <Flex w="40%" h="90%" flexDir="column">
                <Header />
                <div></div>
                <Messages messages={messages} forcedActionButtons={forcedActionButtons} />
                <Footer
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    handleSendMessage={handleSendMessage}
                />
            </Flex>
        </Flex>
    );
};

export default Chat;
