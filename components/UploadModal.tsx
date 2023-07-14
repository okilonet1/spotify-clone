"use client";

import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";

import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface UploadModalProps {}

const UploadModal: FC<UploadModalProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.close();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const imageFile = data.image[0];
      const songFile = data.song[0];

      if (!imageFile || !songFile) {
        toast.error("Please select a song and an image");
        return;
      }

      if (!user) {
        toast.error("Please login to upload a song");
        return;
      }

      const uniqueID = uniqid();

      const { data: imageUploadData, error: imageUploadError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${data.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      const { data: songUploadData, error: songUploadError } =
        await supabaseClient.storage
          .from("songs")
          .upload(`song-${data.title}-${uniqueID}`, songFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (songUploadError) {
        setIsLoading(false);
        toast.error(
          songUploadError.message || "An error occurred, Failed to upload song"
        );
      }

      if (imageUploadError) {
        setIsLoading(false);
        toast.error(
          imageUploadError.message ||
            "An error occurred, Failed to upload image"
        );
      }

      

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: data.title,
          author: data.author,
          image_path: imageUploadData?.path,
          song_path: songUploadData?.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        toast.error(
          supabaseError.message || "An error occurred, Failed to upload song"
        );
      }

      toast.success("Song uploaded successfully");
      setIsLoading(false);
      router.refresh();
      reset();
      uploadModal.close();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <Modal
      title="Upload a file"
      description="Upload an mp3 file to the server"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Author/Minister"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            disabled={isLoading}
            {...register("song", { required: true })}
            type="file"
            accept=".mp3"
          />
        </div>
        <div>
          <div className="pb-1">Select a cover Image</div>
          <Input
            id="image"
            disabled={isLoading}
            {...register("image", { required: true })}
            type="file"
            accept="image/*"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
