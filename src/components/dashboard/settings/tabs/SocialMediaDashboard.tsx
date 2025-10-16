import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SocialMediaDashboardQuery } from "@/services/Seller-services/socialmedia/queries";
import { toast } from "sonner";
import {
  createSocialMediaDashboardMutation,
  updateSocialMediaDashboardMutation,
} from "@/services/Seller-services/socialmedia/mutations";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function SocialMediaDashboard() {
  const queryClient = useQueryClient();
  const { data: socialMediaDashboard } = useQuery(SocialMediaDashboardQuery());
  const [phone, setPhone] = useState("+994");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const {
    mutate: createSocialMediaDashboard,
    isPending: isCreatingSocialMediaDashboard,
  } = useMutation({
    ...createSocialMediaDashboardMutation(),
    onSuccess: () => {
      toast.success("Dəyişikliklər uğurla yadda saxlanıldı");
      queryClient.invalidateQueries(SocialMediaDashboardQuery());
    },
    onError: (error) => {
      toast.error("Xəta baş verdi: " + error.message);
    },
  });

  const {
    mutate: updateSocialMediaDashboard,
    isPending: isUpdatingSocialMediaDashboard,
  } = useMutation({
    ...updateSocialMediaDashboardMutation(),
    onSuccess: () => {
      toast.success("Dəyişikliklər uğurla yadda saxlanıldı");
      queryClient.invalidateQueries(SocialMediaDashboardQuery());
    },
    onError: (error) => {
      toast.error("Xəta baş verdi: " + error.message);
    },
  });

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/.*/i;
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/.*/i;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*/i;

   
    if (!emailRegex.test(email)) {
      toast.error("Keçərli email daxil edin.");
      return false;
    }
    if (facebook && !facebookRegex.test(facebook)) {
      toast.error("Facebook linki keçərli deyil (facebook.com olmalıdır).");
      return false;
    }
    if (instagram && !instagramRegex.test(instagram)) {
      toast.error("Instagram linki keçərli deyil (instagram.com olmalıdır).");
      return false;
    }
    if (linkedin && !linkedinRegex.test(linkedin)) {
      toast.error("LinkedIn linki keçərli deyil (linkedin.com olmalıdır).");
      return false;
    }
    return true;
  };

  const handleSaveChanges = () => {
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedin);

    if (socialMediaDashboard?.data?.id) {
      updateSocialMediaDashboard({ id: socialMediaDashboard.data.id, formData });
    } else {
      createSocialMediaDashboard(formData);
    }
  };

  useEffect(() => {
    if (socialMediaDashboard) {
      setPhone(socialMediaDashboard.data?.phone || "+994");
      setEmail(socialMediaDashboard.data?.email || "");
      setAddress(socialMediaDashboard.data?.address || "");
      setFacebook(socialMediaDashboard.data?.facebook || "");
      setInstagram(socialMediaDashboard.data?.instagram || "");
      setLinkedin(socialMediaDashboard.data?.linkedin || "");
    }
  }, [socialMediaDashboard]);

  return (
    <Card>
      <CardHeader className="max-md:p-4">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
          <CardTitle className="text-2xl font-medium max-md:text-xl">
            Sosial media
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-md:space-y-3 max-md:p-4 max-md:pt-0">
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:space-y-3">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon nömrəsi</Label>
            <PhoneInput
              country={"az"}
              value={phone}
              onChange={setPhone}
              inputProps={{
                id: "phone",
                placeholder: "Telefon nömrəsinizi daxil edin",
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email adresinizi daxil edin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Ünvan</Label>
            <Input
              id="address"
              placeholder="Ünvanınızı daxil edin"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/…"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              type="url"
              placeholder="https://instagram.com/…"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/…"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSaveChanges}
            disabled={
              isCreatingSocialMediaDashboard || isUpdatingSocialMediaDashboard
            }
            className="bg-red-600 hover:bg-red-700 text-white px-6 h-12 rounded-[12px]"
          >
            Dəyişiklikləri yadda saxla
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SocialMediaDashboard;