"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Source, SourceType } from "@/lib/types";

export function AddSourceModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (source: Source) => void }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<SourceType>("news");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogTitle className="text-zinc-100 font-bold tracking-tight">Add Source</DialogTitle>
        <div className="space-y-3 mt-3">
          <Input placeholder="Source name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="https://example.com/feed.xml" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Select value={type} onValueChange={(v) => setType(v as SourceType)}>
            <SelectTrigger><SelectValue placeholder="Source type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="blog">Blog</SelectItem><SelectItem value="reddit">Reddit</SelectItem><SelectItem value="news">News</SelectItem><SelectItem value="hn">HN</SelectItem><SelectItem value="github">GitHub</SelectItem><SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 bg-emerald-500 text-zinc-950 hover:bg-emerald-400" onClick={() => {
              if (!name.trim() || !url.trim()) return;
              onAdd({ id: `custom-${Date.now()}`, name: name.trim(), url: url.trim(), type, enabled: true });
              setName(""); setUrl(""); setType("news");
            }}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
