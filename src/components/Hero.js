import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Flex,
    Image,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react";

/**
 * This generic component is from a CodePen on using Chokra splash pages so we can have a clear explainer
 * It's not a major part of the project.
 * @param title
 * @param subtitle
 * @param image
 * @param ctaText
 * @param ctaOnClick
 * @param rest
 * @returns {*}
 * @constructor
 */
export default function Hero({
                                 title,
                                 subtitle,
                                 image,
                                 ctaText,
                                 ctaOnClick,
                                 ...rest
                             }) {
    return (
        <div>
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
            {...rest}
        >
            <Stack
                spacing={4}
                w={{ base: "80%", md: "40%" }}
                align={["center", "center", "flex-start", "flex-start"]}
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="primary.800"
                    textAlign={["center", "center", "left", "left"]}
                >
                    {title}
                </Heading>
                <Heading
                    as="h2"
                    size="md"
                    color="primary.800"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                >
                    {subtitle}
                </Heading>
                    <Button
                        onClick={() => ctaOnClick()}
                        colorScheme="green"
                        borderRadius="8px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        size="lg"
                    >
                        {ctaText}
                    </Button>
                <Text
                    fontSize="xs"
                    mt={2}
                    textAlign="center"
                    color="primary.800"
                    opacity="0.6"
                >
                    (That's not a pun on losing weight)
                </Text>
            </Stack>
            <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                {/* TODO: Make this change every X secs */}
                <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
        </Flex>
            <div style={{margin: "0 auto", backgroundColor:"rgb(240,255,240)", padding:"20px", fontSize:"130%",alignText:"center"}}>
                ☕ Did you know a coffee at <b>3pm uses 20% more carbon</b> (g/kwH) than at 11am?
            </div>
        </div>
    );
}

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string
};

Hero.defaultProps = {
    title: "React landing page with Chakra UI",
    subtitle:
        "This is the subheader section where you describe the basic benefits of your product",
    image: "https://source.unsplash.com/collection/404339/800x600",
    ctaText: "Create your account now",
    ctaOnClick: () => alert('No onclick set!')
};
