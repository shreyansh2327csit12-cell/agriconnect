import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/components/ui/use-toast";
// import Navbar from "@/components/Navbar";
import { ArrowUpCircle, ArrowDownCircle, User, Clock } from "lucide-react";
import { postComment, getForumPostByid } from "../http/api";

// Dummy question data - would come from an API in a real app
const QUESTION = {
  id: "1",
  title: "What's the best way to deal with corn rootworm without chemicals?",
  content:
    "I've been having issues with corn rootworm damaging my crops and I'd prefer natural solutions. Has anyone tried crop rotation or beneficial nematodes with success? I've heard mixed reviews about companion planting as a deterrent.\n\nMy farm is in the Midwest, with approximately 80 acres of corn. The damage has been progressively getting worse over the last three growing seasons, and I'm concerned about next year's yield if I don't address this effectively.",
  author: "CornFarmer",
  authorAvatar: "",
  date: "June 15, 2023",
  votes: 12,
  tags: ["crops", "pest-control", "organic"],
};

// Dummy answers
// const ANSWERS = [
//   {
//     id: "a1",
//     content:
//       "Crop rotation is definitely the most effective organic solution for corn rootworm. Adult rootworms lay eggs in corn fields in late summer, and the eggs hatch the following spring. By rotating to soybeans or another non-host crop, you break the life cycle.\n\nI've been rotating corn with soybeans for over 10 years and rarely have rootworm issues anymore. It's simple but effective.",
//     author: "OrganicFarmer42",
//     authorAvatar: "",
//     date: "June 16, 2023",
//     votes: 8,
//   },
//   {
//     id: "a2",
//     content:
//       "I've had good results using beneficial nematodes for rootworm control. The species Heterorhabditis bacteriophora specifically targets rootworm larvae. Application timing is critical - apply them when soil temperatures are consistently above 60°F and larvae are present but still young.\n\nMake sure to follow the storage and application instructions carefully, as nematodes are living organisms and can die if mishandled. I usually apply them in the evening with plenty of water to help them move into the soil.",
//     author: "BioControlEnthusiast",
//     authorAvatar: "",
//     date: "June 17, 2023",
//     votes: 6,
//   },
//   {
//     id: "a3",
//     content:
//       "While crop rotation is the gold standard, some rootworm variants have adapted by laying eggs in soybean fields or extending their diapause for more than one season. If you're in an area with these variants, consider a longer rotation with multiple non-host crops.\n\nAlso, consider planting a cover crop mix that includes buckwheat and mustards after harvest - these have some biofumigation properties that may reduce pest pressure the following season.",
//     author: "AgExtension",
//     authorAvatar: "",
//     date: "June 18, 2023",
//     votes: 15,
//   },
// ];

const QuestionDetail = () => {
  const { id } = useParams();
  const [answerText, setAnswerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [question, setQuestion] = useState([])
  const [comments, setComments] = useState([])
//   const { toast } = useToast();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getForumPostByid(id);
        console.log(response)
        setComments(response.comments);
        setQuestion(response);
        // setQuestions(response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchDetails();
  }, []);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("sdfsdfssssssssss")

    const response = await postComment(id, { comment: answerText });
    console.log(1, response);
      setIsSubmitting(false);
      setAnswerText("");
    // Simulate posting the answer
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setAnswerText("");
    // //   toast({
    // //     title: "Answer Posted",
    // //     description: "Your answer has been posted successfully.",
    // //   });
    // }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Question */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-farm-earth text-green-600">
                  {question.title}
                </h1>
                <div className="flex flex-wrap gap-1">
                  {QUESTION.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-farm-wheat text-farm-earth"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowUpCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Upvote</span>
                  </Button>
                  <span className="text-sm font-medium">{12}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowDownCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Downvote</span>
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <p className="whitespace-pre-line">{question.description}</p>
                  <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>sayantan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {/* <span>{question.createdAt}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answers */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-farm-earth mb-4">
               Answers
            </h2>
            <div className="space-y-6">
              {comments.map((answer) => (
                <Card key={answer?._id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowUpCircle className="h-5 w-5 text-muted-foreground" />
                          <span className="sr-only">Upvote</span>
                        </Button>
                        <span className="text-sm font-medium">
                          {/* {answer?.votes} */}12
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowDownCircle className="h-5 w-5 text-muted-foreground" />
                          <span className="sr-only">Downvote</span>
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="whitespace-pre-line">{answer?.comment}</p>
                        <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{answer?.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{answer?.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Your Answer */}
          <div>
            <h2 className="text-xl font-semibold text-farm-earth mb-4">
              Your Answer
            </h2>
            <form onSubmit={handleSubmitAnswer}>
              <div className="space-y-4">
                <Textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Share your knowledge or experience..."
                  className="min-h-[200px] resize-y border-farm-brown-light/20"
                  required
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className=""
                  >
                    {isSubmitting ? "Posting..." : "Post Your Answer"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="border-t border-farm-brown-light/20 bg-muted/50 py-6 mt-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © 2023 FarmHelp Community. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuestionDetail;
