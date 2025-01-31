import { useEffect, useState } from "react";
import { FaMicrophoneAlt, FaMapPin } from "react-icons/fa";
import {
  MdOutlineOnlinePrediction,
  MdOutlinePeople,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TbCoin, TbCoinOff } from "react-icons/tb";

import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";

export default function EventCard({ event, usernames }) {
  const fallbackImageSize = 60;
  const [startTime, setStartTime] = useState(event.date.startFmt)
  const [endTime, setEndTime] = useState(event.date.endFmt)
  
  useEffect((() => {
    const dateTimeStyle = {
      dateStyle: "full",
      timeStyle: "long",
    };
    setStartTime( new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
      new Date(event.date.start)
    ));
    setEndTime( new Intl.DateTimeFormat("en-GB", dateTimeStyle).format(
      new Date(event.date.end)
    ));
  }),[event.date])

  return (
    <li
      className="py-4 border-l-3 mb-4 pl-2 rounded-lg shadow-lg transition duration-350 dark:bg-primary-medium hover:scale-[.99] hover:shadow-sm duration-500 ease-in-out"
      style={{
        borderColor: event.color,
      }}
    >
      <div className="flex space-x-4">
        <div className="flex flex-col place-content-center">
          {event.isVirtual && (
            <MdOutlineOnlinePrediction title="Virtual event" />
          )}
          {event.isInPerson && <MdOutlinePeople title="In person event" />}
          {event.date.cfpOpen && <FaMicrophoneAlt title="CFP is open" />}
          {event.price?.startingFrom > 0 && <TbCoin title="Paid event" />}
          {event.price?.startingFrom === 0 && <TbCoinOff title="Free event" />}
        </div>
        <div className="flex-1 space-y-1 p-4">
          <div className="flex items-center justify-between">
            <Link
              href={event.url}
              key={event.url}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-line:none"
            >
              <div className="flex justify-between">
                <p className="text-xl tracking-wide font-medium capitalize">
                  {event.name}
                </p>
                {event.userStatus && (
                  <div className="text-primary-medium-low dark:text-primary-low-medium italic hidden lg:block">
                    {event.userStatus}
                    {event.userStatus == "speaking" && " at "} this event
                    {event.userStatus == "speaking" && event?.speakingTopic && (
                      <>
                        {" "}
                        on <b>{event.speakingTopic}</b>
                      </>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs sm:text-sm text-primary-high dark:text-primary-low flex flex-col lg:flex-row gap-2">
                <span>
                  {startTime}
                </span>
                <MdOutlineArrowRightAlt className="self-center hidden lg:block" />
                <span>
                  {endTime}
                </span>
              </p>
              <ReactMarkdown className="text-sm text-primary-medium dark:text-primary-low-medium py-1 flex-wrap">
                {event.description}
              </ReactMarkdown>
              <p className="text-sm text-primary-high dark:text-primary-low-medium py-1 flex gap-2 flex-wrap">
                {(event.isVirtual || (event.isInPerson && event.location)) && (
                  <FaMapPin />
                )}
                <span>
                  {event.isVirtual && "Remote"}
                  {event.isVirtual &&
                    event.isInPerson &&
                    event.location &&
                    " AND in "}
                  {event.isInPerson &&
                    event.location &&
                    Object.values(event.location).join(", ")}
                </span>
              </p>
            </Link>
            <div className="isolate flex -space-x-1 ">
              {
                usernames && (
                  usernames.map((user) => {
                    return (
                      <Link
                        href={`/${user}`}
                        key={user}
                        className=" hidden lg:block h-10 w-10  "
                      >
                        <FallbackImage
                          src={`https://github.com/${user}.png`}
                          alt={`Profile picture of ${user}`}
                          width={fallbackImageSize}
                          height={fallbackImageSize}
                          fallback={user}
                          className="relative z-30 inline-block  rounded-full ring-2 ring-white"
                        />
                      </Link>
                    )
                  })
                )
              }
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
