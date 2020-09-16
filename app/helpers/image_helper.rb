# frozen_string_literal: true

module ImageHelper
  def lazy_image_attachment_tag(attachment, options)
    placeholder = attachment.url(:thumb_64)
    src = options[:version] ? attachment.url(options[:version]) : attachment.url
    class_attr = options[:class].to_s + ' lazy'

    image_tag(
      placeholder,
      options.merge(
        class: class_attr,
        id: SecureRandom.hex(10),
        data: { src: src, flickity_lazyload_src: src }
      )
    )
  end

  def avatar_url(user = nil, version = :thumb_64)
    return 'default-avatar1.png' unless user

    if user.avatar.url.present?
      user.avatar.url(version)
    elsif user.facebook_avatar.present?
      user.facebook_avatar + '?type=large'
    else
      user.female? ? 'default-avatar2.png' : 'default-avatar1.png'
    end
  end

  # Returns an image url or a fallback image for a generic resource.
  # resouce is a photo or any resource that responds to #cover, #photo or #photos
  def attachment_url(resource, version = :thumb_64)
    uploader = if resource.respond_to?(:mount_on)
                 resource
               else
                 extract_uploader(resource)
               end

    uploader.present? ? uploader.url(version) : 'no-img-fallback.png'
  end

  def extract_uploader(resource)
    return resource.attachment if resource.respond_to?(:attachment)

    if resource.respond_to?(:cover) && resource.cover.present?
      resource.cover
    elsif resource.respond_to?(:photo) && resource.photo.present?
      resource.photo
    else
      resource.photos&.first&.attachment
    end
  end
end
