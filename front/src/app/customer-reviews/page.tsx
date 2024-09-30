import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Comments from "@/components/Comments/Comments";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import FormComments from "@/components/FormComments/FormComments";
import React from "react";

export default function page() {
  return (
    <div className="w-full mx-auto max-w-7xl my-8">
      <Breadcrums />
      <h1 className="mt-6 text-xl mb-6">نظرات مشتریان نسبت به ما</h1>
      <div className="max-w-4xl mx-auto">
        <Comments />
        <div className="mt-8">
          <FormComments />
        </div>
      </div>
      <ContactSocialMedia classDiv="mt-20" />
    </div>
  );
}
