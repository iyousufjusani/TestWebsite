import { Spin } from "antd";
import { Chat } from "boomaeats-chat";
import "boomaeats-chat/dist/index.css";
import React, { memo, useEffect, useMemo, useState } from "react";
import styles from "../../styles/Chatbox.module.css";
import {
  setLiveChatSession,
  updateChatSessionById,
} from "../../redux/auth/action";
import AuthApi from "../../redux/auth/authApi";
import moment from "moment";
import { CLIENT_SUPPORT } from "../../config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { chatSession } from "../../interfaces";
import { AnimatePresence, motion } from "framer-motion";
type Props = {
  show: boolean;
  session?: chatSession;
  onSessionChange: (data: chatSession) => void;
};
const Index: React.FC<Props> = ({ session, onSessionChange, show }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { site } = useAppSelector((state) => state.site);
  const { isOpen, days, time } = useMemo(() => {
    try {
      if (site) {
        const chatScheduleTime = site?.Settings?.chatScheduleTime;
        const fetchDays = chatScheduleTime?.days;

        const sortDays = fetchDays?.sort?.((a: string, b: string) => {
          return moment(a, "dddd").day() > moment(b, "dddd").day() ? 1 : -1;
        });

        const day = sortDays?.find(
          (e) => e === moment().format("dddd").toLocaleLowerCase()
        );
        const time = chatScheduleTime?.time;

        const isOpen =
          day &&
          moment().isBetween(
            moment(time[0], "HH:mm"),
            moment(time[1], "HH:mm")
          );

        return {
          isOpen,
          days: sortDays,
          time,
        };
      }
      return {
        isOpen: false,
        days: [],
        time: [],
      };
    } catch (error) {
      return {
        isOpen: false,
        days: [],
        time: [],
      };
    }
  }, [site]);
  const [finalSession, setFinalSession] = useState<any>(null);
  useEffect(() => {
    setFinalSession(session);
  }, [session]);
  const dispatch = useAppDispatch();
  const onTypeHandler = (typing: boolean) => {
    if (!finalSession || !session) {
      return;
    }

    const updateSession = {
      ...session,

      chats: finalSession?.chats?.map((e) => {
        if (e.senderId !== user?.id) {
          return {
            ...e,
            status: "SEEN",
          };
        }
        return e;
      }),
      users: finalSession?.users?.map((e) => {
        if (e.id === user?.id) {
          return {
            ...e,
            typing,
          };
        }
        return e;
      }),
    };

    dispatch(
      updateChatSessionById(updateSession, finalSession.id, (data) => {
        onSessionChange(data);
      })
    );
  };
  const onSendHandler = async (e) => {
    if (!isOpen && !finalSession) {
      return;
    }

    const files = e?.chat?.files?.map((e) => e.file);
    const authApi = new AuthApi();
    const imageUrls = await authApi.uploadFilesStorage(files);

    if (e.session) {
      const newSession = {
        ...e.session,
        platform: "website",

        chats: [{ ...e.chat, files: imageUrls }],
        users: [
          {
            id: user?.id,
            name: user?.name,
            image: user?.profileImage || "",
            number: user?.phoneNumber,
            email: user?.email,
            typing: false,
            role: "driver",
          },
        ],
      };
      dispatch(setLiveChatSession(newSession, stopLoader));
      return;
    }
    const updateSession = {
      ...finalSession,
      chats: [...finalSession.chats, { ...e.chat, files: imageUrls }],
      users: finalSession.users.map((e) => {
        if (e.id === user?.id) {
          return {
            ...e,
            typing: false,
          };
        }
        return e;
      }),
    };
    dispatch(
      updateChatSessionById(updateSession, finalSession.id, (data) => {
        onSessionChange(data);
      })
    );
  };

  const [loader, setLoader] = useState(false);
  const stopLoader = (data: chatSession) => {
    setLoader(false);
    onSessionChange(data);
  };
  const chats = useMemo(() => {
    return finalSession?.chats || [];
  }, [finalSession]);
  const users = useMemo(() => {
    return finalSession?.users || [];
  }, [finalSession]);
  if (!user) {
    return null;
  }
  return (
    <Spin className="mr-4" spinning={loader}>
      <AnimatePresence>
        {show && (
          <motion.div
            className={styles.chatboxPopup}
            style={{
              backgroundColor:
                "linear-gradient( 90deg, hsla(33, 75%, 61%, 1) 0%, hsla(33, 100%, 76%, 1) 47%, hsla(33, 100%, 71%, 1) 64%, hsla(33, 75%, 61%, 1) 100% )",
            }}
          >
            <Chat
              title=""
              // soundUrl="https://firebasestorage.googleapis.com/v0/b/boomaeats-d8c74.appspot.com/o/audio%2Fmixkit-positive-notification-951.wav?alt=media&token=3bd4a9a7-24fa-4159-9e5f-581c23af2225"
              containerStyle={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
                borderRadius: 10,
              }}
              wellcomeMessage={
                isOpen
                  ? `Welcome ${user?.name} to our chat support. Our support team is ready to help you with any questions you may have.`
                  : `Welcome ${
                      user?.name
                    } to our chat support. Our support team is currently offline. ${
                      days?.length > 1
                        ? `Our chat support avaialble is between ${days[0]}${
                            days[days?.length - 1] &&
                            ` - ${days[days?.length - 1]} ${
                              time && `(${time[0]} - ${time[1]})`
                            }`
                          }. Your can also email our support team at ${CLIENT_SUPPORT}`
                        : `Please check back later or contact us via email ${CLIENT_SUPPORT} `
                    }`
              }
              sender={user?.id}
              chats={chats}
              users={users}
              onTyping={onTypeHandler}
              session={session}
              onSend={onSendHandler}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Spin>
  );
};

export default memo(Index);
