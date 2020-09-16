# frozen_string_literal: true

module Views
  module Apartments
    class BannerComponent < ApplicationComponent
      attr_reader :colocation, :marker

      delegate :virtual_tour_url, :showcase, to: :colocation

      def initialize(colocation: nil, marker: nil)
        @colocation = colocation
        @marker = marker
      end

      def virtual_tour_index
        0
      end

      def photos_index
        virtual_tour_url.present? ? 1 : 0
      end

      def map_index
        virtual_tour_url.present? ? showcase.length + 1 : showcase.length
      end
    end
  end
end

# <div class="banner-slider-controls d-none d-lg-flex"">
#   <% @colocation.showcase.each_with_index do |_image, index| %>
#     <%= render Bootstrap::Text::LinkComponent.new(
#               options: { class: 'banner-slider-control' },
#               data: { action: 'click->slider#goTo', target: 'slider.control', slide_target: index }) %>
#   <% end %>

#   <%= render Bootstrap::Text::LinkComponent.new(
#     options: { class: 'banner-slider-control' },
#     data: { action: 'click->slider#goTo', target: 'slider.control', slide_target: @colocation.showcase.length }) %>

#   <% if @colocation.virtual_tour_url.present? %>
#     <%= render Bootstrap::Text::LinkComponent.new(
#       options: { class: 'banner-slider-control' },
#       data: { action: 'click->slider#goTo', target: 'slider.control', slide_target: @colocation.showcase.length + 1 }) %>
#   <% end %>
# </div>
