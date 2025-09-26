"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { UserData } from "@/types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserMutation } from "@/services/auth/updateUser/mutations";
import { getUserQuery } from "@/services/auth/queries";

const PersonalInfo = ({ user }: { user: UserData }) => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    ...updateUserMutation(),
    onSuccess: () => {
      toast.success("Dəyişikliklər uğurla yadda saxlanıldı");
      queryClient.invalidateQueries(getUserQuery());
    },
    onError: (error) => {
      toast.error("Xəta baş verdi: " + error.message);
    },
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [voen, setVoen] = useState("");
  const [fin, setFin] = useState("");
  const [type, setType] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState<string | File>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setVoen(user.voen || "");
      setFin(user.fin || "");
      setType(user.type || "");
      setRegion(user.region || "");
      setImage(user.image || "");
      setImagePreview(user.image || "");
    }
  }, [user]);

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("voen", voen);
    formData.append("fin", fin);
    formData.append("type", type);
    formData.append("region", region);
    formData.append("image", image instanceof File ? image : image);
    updateUser(formData);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <CardTitle className="flex text-2xl font-medium items-center gap-2 max-md:text-xl">
          Şəxsi məlumatlar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 max-md:space-y-4 max-md:p-4 max-md:pt-0">
        <div className="flex items-center gap-4 max-md:gap-3">
          <div className="relative">
            <Avatar className="h-20 w-20 max-md:h-16 max-md:w-16">
              <AvatarImage
                src={imagePreview || user.image || ""}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="text-lg max-md:text-base">
                AF
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <Button
              size="sm"
              variant="outline"
              className="absolute -top-1 -right-1 h-8 w-8 rounded-full p-0 max-md:h-6 max-md:w-6 pointer-events-none"
            >
              <Pencil className="h-4 w-4 max-md:h-3 max-md:w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-6 max-md:space-y-4">
          <div className="grid grid-cols-2 gap-6 w-full max-md:grid-cols-1 max-md:gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="name">Ad,soyad</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-lg w-full max-md:h-10"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="phone">Telefon nömrəsi</Label>
              <div className="flex items-center w-full h-12 border border-gray-300 rounded-lg focus-within:ring-1 transition-all duration-200 max-md:h-10">
                <Select defaultValue="+994">
                  <SelectTrigger className="w-24 h-full bg-transparent border-0 rounded-r-none focus:ring-0 max-md:w-20 max-md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+994">+994</SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-px h-6 bg-gray-200 max-md:h-5"></div>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 h-full bg-transparent border-0 rounded-l-none focus:ring-0 max-md:text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="voen">VÖEN</Label>
              <Input
                id="voen"
                value={voen}
                onChange={(e) => setVoen(e.target.value)}
                className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="fin">FİN kod</Label>
              <Input
                id="fin"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="membership">Üzvlük tipi</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm">
                  <SelectValue placeholder="Üzvlük tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Fiziki şəxs</SelectItem>
                  <SelectItem value="2">Hüquqi şəxs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-md:grid-cols-1">
            <div className="space-y-2 w-full">
              <Label htmlFor="region">Bölgə</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-12 rounded-lg w-full max-md:h-10 max-md:text-sm">
                  <SelectValue placeholder="Bölgə seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baku">Bakı</SelectItem>
                  <SelectItem value="ganja">Gəncə</SelectItem>
                  <SelectItem value="sumgait">Sumqayıt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end max-md:justify-center">
          <Button
            className="bg-[#FF13F0] hover:bg-purple-700 cursor-pointer rounded-[16px] max-md:w-full max-md:h-10"
            onClick={handleSaveChanges}
            disabled={isPending}
          >
            {isPending ? "Yadda saxlanılır..." : "Dəyişiklikləri yadda saxla"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;