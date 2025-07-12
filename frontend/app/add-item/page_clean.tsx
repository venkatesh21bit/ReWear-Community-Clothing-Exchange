"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Package, ArrowLeft, Camera, Plus, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { itemsAPI, uploadAPI } from "@/lib/api"

export default function AddItemPage() {
  const router = useRouter()
  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    brand: "",
    color: "",
    pointValue: "",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      const newImages = fileArray.slice(0, 5 - images.length) // Max 5 images total
      
      setImages((prev) => [...prev, ...newImages])
      
      // Create preview URLs
      const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file))
      setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(imagePreviewUrls[index])
    
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)

    console.log("Submitting new item:", { ...formData, images: images.length, tags })

    try {
      // Validation
      if (!formData.title || !formData.description || !formData.category || !formData.condition || !formData.pointValue) {
        setSubmissionStatus({ type: "error", message: "Please fill in all required fields" })
        setIsSubmitting(false)
        return
      }

      let uploadedImageUrls: string[] = []

      // Upload images if any
      if (images.length > 0) {
        const uploadResponse = await uploadAPI.uploadImages(images)
        if (uploadResponse.success) {
          uploadedImageUrls = uploadResponse.images.map(img => img.url)
        }
      }

      // Create item
      const itemData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type || formData.category,
        size: formData.size,
        condition: formData.condition,
        brand: formData.brand,
        color: formData.color,
        points_value: parseInt(formData.pointValue),
        tags: tags.join(", "),
        images: uploadedImageUrls,
      }

      const response = await itemsAPI.createItem(itemData)

      if (response.success) {
        setSubmissionStatus({ type: "success", message: "Item submitted successfully!" })
        
        // Clear form after successful submission
        setFormData({
          title: "",
          description: "",
          category: "",
          type: "",
          size: "",
          condition: "",
          brand: "",
          color: "",
          pointValue: "",
        })
        setImages([])
        setImagePreviewUrls([])
        setTags([])
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      setSubmissionStatus({ type: "error", message: error.message || "Failed to submit item. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List a New Item</h1>
          <p className="text-gray-600">Share your unused clothes with the ReWear community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Photos
              </CardTitle>
              <CardDescription>
                Add up to 5 photos of your item. Good photos help your item get noticed!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {imagePreviewUrls.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={imageUrl}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {images.length < 5 && (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tops">Tops</SelectItem>
                      <SelectItem value="Bottoms">Bottoms</SelectItem>
                      <SelectItem value="Dresses">Dresses</SelectItem>
                      <SelectItem value="Outerwear">Outerwear</SelectItem>
                      <SelectItem value="Shoes">Shoes</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail. Include material, style, fit, and any notable features..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Provide specific information about your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    placeholder="e.g., M, L, 32, 8"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New with tags">New with tags</SelectItem>
                      <SelectItem value="Like new">Like new</SelectItem>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Very good">Very good</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pointValue">Point Value *</Label>
                  <Input
                    id="pointValue"
                    type="number"
                    placeholder="e.g., 150"
                    value={formData.pointValue}
                    onChange={(e) => handleInputChange("pointValue", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Nike, Zara, H&M"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Blue, Black, Red"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help people find your item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., vintage, casual, summer)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} disabled={!newTag.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 w-4 h-4"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Message */}
          {submissionStatus && (
            <div
              className={`p-4 rounded-lg text-center ${
                submissionStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {submissionStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSubmitting ? "Submitting..." : "List Item for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
