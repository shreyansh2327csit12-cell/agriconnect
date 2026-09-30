import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";
import { createQuestion } from "../http/api";

const AskQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate posting the question
    // setTimeout(() => {
    //   setIsSubmitting(false);
    // //   toast({
    // //     title: "Question Posted",
    // //     description: "Your question has been posted successfully.",
    // //   });
    //   navigate("/");
    // }, 1000);
    const postQuestion = async () => {  
      try {
        const response = await createQuestion({
          title,
          description,
          tags,
        });
        console.log(response);
        setIsSubmitting(false);
        navigate("/community-forum");
      } catch (error) {
        console.error("Error creating question:", error);
        setIsSubmitting(false);
      }
    }
    postQuestion();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-farm-green ">
          Ask a Question
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's your farming question?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-farm-brown-light/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Details</Label>
            <Textarea
              id="description"
              placeholder="Provide details about your question..."
              value={description}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[150px] resize-y border-farm-brown-light/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Add tags separated by commas (e.g., crops, irrigation, livestock)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border-farm-brown-light/20"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto bg-farm-green hover:bg-farm-green-light"
          >
            {isSubmitting ? "Posting..." : "Post Question"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AskQuestionForm;
