import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import resSchool from "@/assets/resource-school.jpg";
import resTherapy from "@/assets/resource-therapy.jpg";
import resNgo from "@/assets/resource-ngo.jpg";

const storyImgs = [story1, story2, story3];
const eventImgs = [event1, event2, event3];

function hash(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

export const storyFallback = (id: string) => storyImgs[hash(id) % storyImgs.length];
export const eventFallback = (id: string) => eventImgs[hash(id) % eventImgs.length];
export const resourceFallback = (category?: string) => {
  if (category === "school") return resSchool;
  if (category === "therapy") return resTherapy;
  return resNgo;
};
