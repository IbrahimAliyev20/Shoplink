import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { getShowClientQuery } from '@/services/Seller-services/clients/queries'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCreateFeedbackMutation, useUpdateFeedbackMutation, useDeleteFeedbackMutation } from '@/services/Seller-services/feedback/mutations'
import { toast } from 'sonner'

function FeedBack({ user_id }: { user_id: string }) {
  const queryClient = useQueryClient()
  const {data: clientFeedback} = useQuery({
    ...getShowClientQuery(user_id),
  })

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')

  useEffect(() => {
    if (isEditDialogOpen && clientFeedback?.feedback) {
      setFeedbackText(clientFeedback.feedback)
    }
  }, [isEditDialogOpen, clientFeedback?.feedback])

  const createMutation = useMutation({
    ...useCreateFeedbackMutation(),
    onSuccess: () => {
      toast.success('Qeyd uğurla əlavə edildi')
      queryClient.invalidateQueries({ queryKey: getShowClientQuery(user_id).queryKey })
      setIsCreateDialogOpen(false)
      setFeedbackText('')
    },
    onError: () => {
      toast.error('Qeyd əlavə edilərkən xəta baş verdi')
    }
  })

  const updateMutation = useMutation({
    ...useUpdateFeedbackMutation(),
    onSuccess: () => {
      toast.success('Qeyd uğurla yeniləndi')
      queryClient.invalidateQueries({ queryKey: getShowClientQuery(user_id).queryKey })
      setIsEditDialogOpen(false)
      setFeedbackText('')
    },
    onError: () => {
      toast.error('Qeyd yenilənərkən xəta baş verdi')
    }
  })

  const deleteMutation = useMutation({
    ...useDeleteFeedbackMutation(),
    onSuccess: () => {
      toast.success('Qeyd uğurla silindi')
      queryClient.invalidateQueries({ queryKey: getShowClientQuery(user_id).queryKey })
    },
    onError: () => {
      toast.error('Qeyd silinərkən xəta baş verdi')
    }
  })

  const handleCreateFeedback = () => {
    if (!feedbackText.trim()) {
      toast.error('Qeyd mətni boş ola bilməz')
      return
    }

    const formData = new FormData()
    formData.append('note', feedbackText)
    formData.append('user_id', user_id)

    createMutation.mutate(formData)
  }

  const handleUpdateFeedback = () => {
    if (!feedbackText.trim()) {
      toast.error('Qeyd mətni boş ola bilməz')
      return
    }
  
    if (!clientFeedback?.id) {
      toast.error('Feedback ID tapılmadı')
      return
    }
  
    const formData = new FormData()
    formData.append('note', feedbackText)
  
    updateMutation.mutate({ id: clientFeedback.id, formData })
  }

  const handleDeleteFeedback = () => {
    if (!clientFeedback?.id) {
      toast.error('Feedback ID tapılmadı')
      return
    }

    if (clientFeedback.id) {
      deleteMutation.mutate(clientFeedback.id as number)
    }
  }
  return (
    <div>
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Qeydlər
        </h2>
        
        {clientFeedback?.feedback ? (
          <div className="bg-[#fbfdff] p-4 rounded-lg flex items-start justify-between border border-[#F3F2F8] mb-4">
            <p className="text-sm text-gray-700 leading-relaxed pr-2 flex-1">
              {clientFeedback?.feedback}
            </p>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 flex-shrink-0"
                >
                  <MoreHorizontal size={20} className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white rounded-lg shadow-lg border-0 p-1">
                <DropdownMenuItem 
                  className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md hover:bg-gray-100 focus:bg-gray-100"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Pencil size={16} className="text-gray-700" />
                  <span className="text-gray-700 font-medium">Düzəliş et</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-md hover:bg-gray-100 focus:bg-gray-100"
                  onClick={handleDeleteFeedback}
                >
                  <Trash2 size={16} className="text-gray-700" />
                  <span className="text-gray-700 font-medium">Qeydi sil</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full border-dashed mb-4"
            onClick={() => {
              setFeedbackText('')
              setIsCreateDialogOpen(true)
            }}
          >
            <PlusCircle size={16} className="mr-2" />
            Yeni qeyd əlavə et
          </Button>
        )}

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni qeyd əlavə et</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="create-note">Qeyd</Label>
                <Textarea
                  id="create-note"
                  placeholder="Müştəri haqqında qeydlərinizi yazın..."
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false)
                    setFeedbackText('')
                  }}
                  disabled={createMutation.isPending}
                >
                  Ləğv et
                </Button>
                <Button 
                  onClick={handleCreateFeedback}
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? 'Əlavə edilir...' : 'Əlavə et'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Qeydi redaktə et</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-note">Qeyd</Label>
                <Textarea
                  id="edit-note"
                  placeholder="Müştəri haqqında qeydlərinizi yazın..."
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    setFeedbackText('')
                  }}
                  disabled={updateMutation.isPending}
                >
                  Ləğv et
                </Button>
                <Button 
                  onClick={handleUpdateFeedback}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'Yenilənir...' : 'Yadda saxla'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}

export default FeedBack