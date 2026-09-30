import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/src/components/QuestionCard.jsx";
import CommunityHeader from "@/src/components/CommunityHeader.jsx";

import { getQuestions } from "../http/api";
import { Link } from "lucide-react";

const DUMMY_QUESTIONS = [
  {
    id: "1",
    title: "What's the best way to deal with corn rootworm without chemicals?",
    content:
      "I've been having issues with corn rootworm damaging my crops and I'd prefer natural solutions. Has anyone tried crop rotation or beneficial nematodes with success?",
    author: "CornFarmer",
    date: "2 hours ago",
    votes: 12,
    answers: 5,
    tags: ["crops", "pest-control", "organic"],
  },
  {
    id: "2",
    title: "Recommended irrigation system for small vegetable farm?",
    content:
      "I'm setting up a 3-acre vegetable farm and looking for efficient irrigation options. Would drip irrigation be cost-effective at this scale or should I consider other systems?",
    author: "NewFarmer22",
    date: "1 day ago",
    votes: 8,
    answers: 10,
    tags: ["irrigation", "vegetables", "small-farm"],
  },
  {
    id: "3",
    title: "Signs of nitrogen deficiency in wheat",
    content:
      "My wheat fields aren't looking right this season. What are the early signs of nitrogen deficiency that I should be looking for, and when is the best time to address it?",
    author: "WheatGrower",
    date: "3 days ago",
    votes: 15,
    answers: 7,
    tags: ["wheat", "soil", "nutrients"],
  },
  {
    id: "4",
    title: "Best breeds of dairy goats for beginners?",
    content:
      "I'm planning to start a small dairy goat operation on my property. Which breeds are most suitable for beginners in terms of temperament, hardiness, and milk production?",
    author: "GoatLover",
    date: "1 week ago",
    votes: 21,
    answers: 12,
    tags: ["livestock", "goats", "dairy"],
  },
  {
    id: "5",
    title: "How to prevent tomato blight in rainy conditions?",
    content:
      "Every year I struggle with tomato blight when we get a lot of rain. I've tried spacing plants further apart, but still having issues. Any effective prevention methods?",
    author: "TomatoGardener",
    date: "1 week ago",
    votes: 18,
    answers: 8,
    tags: ["tomatoes", "disease", "wet-climate"],
  },
];

const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <CommunityHeader />
      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="pb-6">
          <h1 className="text-3xl font-bold text-farm-earth">
            Farming Community Forum
          </h1>
          <p className="text-muted-foreground">
            Ask questions, share knowledge, and connect with other farmers
          </p>
        </div>

        <Tabs
          defaultValue="recent"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="recent">Recent Questions</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recent" className="space-y-4 mt-0">
            {questions?.map((question) => (
              <QuestionCard
                key={question._id}
                id={question._id}
                title={question.title}
                content={question.description}
                author={question.userId.name}
                date={question.createdAt}
                votes={30}
                answers={question.comments.length}
                tags={question.tags}                
              />
            ))}
          </TabsContent>

          {/* <TabsContent value="popular" className="space-y-4 mt-0">
            {DUMMY_QUESTIONS.slice()
              .sort((a, b) => b.votes - a.votes)
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  content={question.content}
                  author={question.author}
                  date={question.date}
                  votes={question.votes}
                  answers={question.answers}
                  tags={question.tags}
                />
              ))}
          </TabsContent> */}

          {/* <TabsContent value="unanswered" className="space-y-4 mt-0">
            {DUMMY_QUESTIONS.filter((question) => question.answers === 0)
              .length > 0 ? (
              DUMMY_QUESTIONS.filter((question) => question.answers === 0).map(
                (question) => (
                  <QuestionCard
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    author={question.author}
                    date={question.date}
                    votes={question.votes}
                    answers={question.answers}
                    tags={question.tags}
                  />
                )
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No unanswered questions at the moment!
                </p>
              </div>
            )} */}
          {/* </TabsContent> */}
        </Tabs>
      </main>
    </div>
  );
};

export default CommunityForum;
